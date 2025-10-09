#!/bin/bash

PROCESS_NAME="tshark"
TSHARK_PATH=$(which tshark)
LOG_DIR="/home/mohammadi/Desktop/trace/log/"
LOG_FILE="${LOG_DIR}tshark-control.log"
IP=$(hostname -I | awk '{print $1}')
OUTPUT_FILE="/tmp/$IP.pcapng"

# ---------------------- Logging ----------------------
log() {
    # [ADDED]: Create log directory if not exists
    if [ ! -d "$LOG_DIR" ]; then
        mkdir -p "$LOG_DIR" # create directory
        chmod 777 "$LOG_DIR" # permission to directory
    fi

    if [ ! -f "$LOG_FILE" ]; then
        touch "$LOG_FILE"
        chmod 777 "$LOG_FILE"
    fi

    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# ---------------------- Check if tshark is running ----------------------
is_running() {
    pgrep -x "$PROCESS_NAME" > /dev/null
}

# ---------------------- Detect Ports by Process Name or Service Name ----------------------
get_ports_by_services() {
    local services=("$@")
    local -a ports=()

    for service in "${services[@]}"; do
        local found=false

        log "Looking for ports for service/process: $service"

        # Method 1: Try to find in /etc/services first
        local service_port
        service_port=$(grep -E "^$service[[:space:]]+" /etc/services 2>/dev/null | head -1 | awk '{print $2}' | cut -d'/' -f1)

        if [[ -n "$service_port" ]]; then
            found=true
            if [[ ! " ${ports[*]} " =~ " $service_port " ]]; then
                ports+=("$service_port")
                log "Found port $service_port for service '$service' in /etc/services"
            fi
        fi

        # Method 2: Try to find by process name in ss output
        local port_lines_ss
        port_lines_ss=$(sudo ss -tulnp 2>/dev/null | grep "$service")

        if [[ -n "$port_lines_ss" ]]; then
            found=true
            while IFS= read -r line; do
                # Extract port from ss output (format: Local Address:Port)
                extracted_ports=$(echo "$line" | awk '{print $5}' | awk -F':' '{print $NF}')
                for port in $extracted_ports; do
                    if [[ "$port" =~ ^[0-9]+$ && ! " ${ports[*]} " =~ " $port " ]]; then
                        ports+=("$port")
                        log "Found port $port for process '$service' in ss output"
                    fi
                done
            done <<< "$port_lines_ss"
        fi

        # Method 3: Try to find by process name in lsof output
        local port_lines_lsof
        port_lines_lsof=$(sudo lsof -i -P -n 2>/dev/null | grep "$service")

        if [[ -n "$port_lines_lsof" ]]; then
            found=true
            while IFS= read -r line; do
                # Extract port from lsof output
                extracted_ports=$(echo "$line" | awk '{print $9}' | grep -oE ':[0-9]+' | cut -d':' -f2 | sort -u)
                for port in $extracted_ports; do
                    if [[ "$port" =~ ^[0-9]+$ && ! " ${ports[*]} " =~ " $port " ]]; then
                        ports+=("$port")
                        log "Found port $port for process '$service' in lsof output"
                    fi
                done
            done <<< "$port_lines_lsof"
        fi

        # Method 4: Direct port number (if user provided numeric port)
        if [[ "$service" =~ ^[0-9]+$ ]]; then
            found=true
            if [[ ! " ${ports[*]} " =~ " $service " ]]; then
                ports+=("$service")
                log "Using direct port number: $service"
            fi
        fi

        if [[ "$found" = false ]]; then
            log "[WARN] No ports found for service/process '$service'"
        fi
    done

    echo "${ports[@]}"
}

# ---------------------- Start tshark ----------------------
start_tshark() {
    if is_running; then
        log "tshark is already running."
        return
    fi

    shift
    local services=("$@")
    local filters=""

    log "Starting tshark..."

    if [ ${#services[@]} -gt 0 ]; then
        ports=$(get_ports_by_services "${services[@]}")
        if [ -n "$ports" ]; then
            for port in $ports; do
                filters+=" or tcp port $port or udp port $port"
            done
            filters="${filters# or }"
        else
            log "[WARN] No ports found for specified services. Capturing all traffic."
        fi
    fi

    if [ -n "$filters" ]; then
        log "Starting tshark with filters: $filters"
        sudo "$TSHARK_PATH" -i any -f "$filters" -w "$OUTPUT_FILE" > /dev/null 2>&1 &
    else
        log "Starting tshark without filters (capturing all traffic)"
        sudo "$TSHARK_PATH" -i any -w "$OUTPUT_FILE" > /dev/null 2>&1 &
    fi

    # Wait for output file and set permissions
    for i in {1..10}; do
        if [ -f "$OUTPUT_FILE" ]; then
            sudo chmod 777 "$OUTPUT_FILE"
            log "Permissions set for $OUTPUT_FILE"
            break
        fi
        sleep 1
    done

    sleep 1
    if is_running; then
        log "tshark started successfully."
    else
        log "Failed to start tshark."
    fi
}

# ---------------------- Stop tshark ----------------------
stop_tshark() {
    shift
    local services=("$@")

    if ! pgrep -x "$PROCESS_NAME" > /dev/null; then
        log "tshark is not running."
        return
    fi

    if [ ${#services[@]} -eq 0 ]; then
        log "Stopping all tshark processes..."
        sudo pkill -x "$PROCESS_NAME"
        log "All tshark processes stopped."
        return
    fi

    log "Stopping tshark processes for specific services: ${services[*]}"
    local ports=$(get_ports_by_services "${services[@]}")
    if [ -z "$ports" ]; then
        log "[WARN] No ports found for given services. Nothing to stop."
        return
    fi

    local pids_to_kill=()

    while IFS= read -r pid; do
        full_cmd=$(ps -p "$pid" -o args= 2>/dev/null)

        if [[ -n "$full_cmd" ]]; then
            for port in $ports; do
                if [[ "$full_cmd" == *"port $port"* ]]; then
                    pids_to_kill+=("$pid")
                    log "Found tshark process (PID: $pid) filtering port $port"
                    break
                fi
            done
        fi
    done < <(pgrep -x "$PROCESS_NAME")

    if [ ${#pids_to_kill[@]} -eq 0 ]; then
        log "[INFO] No tshark processes found for ports: $ports"
    else
        for pid in "${pids_to_kill[@]}"; do
            sudo kill "$pid"
            log "Stopped tshark process with PID: $pid"
        done
    fi
}

# ---------------------- Status tshark ----------------------
status_tshark() {
    if is_running; then
        log "tshark is currently running."
        # Show running tshark processes and their filters
        pgrep -x "$PROCESS_NAME" | while read pid; do
            cmd=$(ps -p "$pid" -o args=)
            log "  PID $pid: $cmd"
        done
    else
        log "tshark is not running."
    fi
}

# ---------------------- List available services/processes ----------------------
list_services() {
    log "Available services and processes with open ports:"

    # Get unique process names from ss output
    sudo ss -tulnp 2>/dev/null | grep -v "pid=" | awk '{print $7}' | cut -d'"' -f2 | sort -u | while read process; do
        if [[ -n "$process" && "$process" != "-" ]]; then
            ports=$(sudo ss -tulnp 2>/dev/null | grep "\"$process\"" | awk '{print $5}' | awk -F':' '{print $NF}' | sort -u | tr '\n' ' ')
            log "  $process - ports: $ports"
        fi
    done
}

# ---------------------- Main ----------------------
case "$1" in
    start)
        start_tshark "$@"
        ;;
    stop)
        stop_tshark "$@"
        ;;
    status)
        status_tshark
        ;;
    list)
        list_services
        ;;
    *)
        echo "Usage: $0 {start|stop|status|list} [services/processes]"
        echo ""
        echo "Examples:"
        echo "  $0 start                          # Capture all traffic"
        echo "  $0 start bbdh-mmed bbdh-smfd     # Capture traffic for specific processes"
        echo "  $0 start ssh                      # Capture traffic for standard service"
        echo "  $0 start 22 80 443               # Capture traffic for specific ports"
        echo "  $0 stop                          # Stop all tshark processes"
        echo "  $0 stop bbdh-mmed               # Stop tshark for specific process"
        echo "  $0 status                        # Check tshark status"
        echo "  $0 list                          # List available processes with open ports"
        exit 1
        ;;
esac
