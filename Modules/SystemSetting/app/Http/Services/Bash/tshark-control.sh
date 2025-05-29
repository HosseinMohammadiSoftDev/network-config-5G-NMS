#!/bin/bash

# Name of the process to control
PROCESS_NAME="tshark"
TSHARK_PATH=$(which tshark)
LOG_FILE="/home/siz-tel/log/tshark-control.log"
IP=$(hostname -I | awk '{print $1}')

# Function to check if tshark is running
is_running() {
    pgrep -x "$PROCESS_NAME" > /dev/null
}

# Function to start tshark
start_tshark() {
    if is_running; then
        echo "tshark is already running."
    else
        echo "Starting tshark..."
            sudo "$TSHARK_PATH" -i any -w /home/siz-tel/trace/$IP.pcapng > /dev/null 2>&1 & # new command
        sleep 1
        if is_running; then
            echo "tshark started successfully."
        else
            echo "Failed to start tshark."
        fi
    fi
}

# Function to stop tshark
stop_tshark() {
    if is_running; then
        echo "Stopping tshark..."
            sudo pkill -x "$PROCESS_NAME"

        sleep 1
        if is_running; then
            echo "Failed to stop tshark."
        else
            echo "tshark stopped successfully."
        fi
    else
        echo "tshark is not running."
    fi
}

# Function to check status
status_tshark() {
    if is_running; then
        echo "tshark is currently running."
    else
        echo "tshark is not running."
    fi
}

# Main logic
case "$1" in
    start)
        start_tshark
        ;;
    stop)
        stop_tshark
        ;;
    status)
        status_tshark
        ;;
    *)
        echo "Usage: $0 {start|stop|status}"
        ;;
esac
