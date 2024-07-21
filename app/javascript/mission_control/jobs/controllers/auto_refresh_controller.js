import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["interval"]
  static values = {
    enabled: Boolean,
    intervalMs: Number
  }

  connect() {
    this.startPolling();
  }

  disconnect() {
    this.stopPolling()
  }

  startPolling() {
    this.stopPolling() // Clear any existing interval
    this.pollerId = setInterval(() => {
      Turbo.visit(window.location.href, { action: "replace" })
    }, this.intervalMsValue)
  }

  stopPolling() {
    if (this.pollerId) {
      clearInterval(this.pollerId)
      this.pollerId = null
    };
  };
}
