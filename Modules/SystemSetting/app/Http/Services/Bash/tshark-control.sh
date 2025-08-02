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

# ---------------------- Detect Ports by Process Name ----------------------
get_ports_by_services() {
      local services=("$@")
      local -a ports=()

      for service in "${services[@]}"; do
          local found=false

          port_lines=$(sudo ss -tulnp 2>/dev/null | grep "$service")
          if [[ -n "$port_lines" ]]; then
              found=true
          else

              port_lines=$(sudo lsof -i -P -n 2>/dev/null | grep "$service")
              if [[ -n "$port_lines" ]]; then
                  found=true
              fi
          fi

          if [[ "$found" = false ]]; then
              log "[WARN] No ports found for service '$service'"
              continue
          fi

          while IFS= read -r line; do
              extracted_ports=$(echo "$line" | grep -oP ':[0-9]+' | grep -oP '[0-9]+')
              for port in $extracted_ports; do
                  if [[ "$port" =~ ^[0-9]+$ && ! " ${ports[*]} " =~ " $port " ]]; then
                      ports+=("$port")
                  fi
              done
          done <<< "$port_lines"
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
        for port in $ports; do
            filters+=" or tcp port $port"
        done
        filters="${filters# or }"
    fi

    if [ -n "$filters" ]; then
        sudo "$TSHARK_PATH" -i any -f "$filters" -w "$OUTPUT_FILE" > /dev/null 2>&1 &
        log "tshark started with filters: $filters"
    else
        sudo "$TSHARK_PATH" -i any -w "$OUTPUT_FILE" > /dev/null 2>&1 &
        log "tshark started without filters (capturing all traffic)."
    fi

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
# shellcheck disable=SC2120
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
        cmdline=$(ps -p "$pid" -o comm=)
        full_cmd=$(ps -p "$pid" -o args=)

        if [[ "$cmdline" == "tshark" ]]; then
            for port in $ports; do
                if [[ "$full_cmd" == *"port $port"* ]]; then
                    pids_to_kill+=("$pid")
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
    else
        log "tshark is not running."
    fi
}

# ---------------------- Main ----------------------
case "$1" in
    start)
        start_tshark "$@"
        ;;
    stop)
        stop_tshark
        ;;
    status)
        status_tshark
        ;;
    *)
        echo "Usage: $0 {start|stop|status} [services]"
        echo "Example with services: $0 start [mme,hss]"
        echo "Example without services: $0 start"
        exit 1
        ;;
esac
