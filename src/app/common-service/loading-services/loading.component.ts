import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="isLoading" class="loading-overlay">
      <div class="spinner">
        <div class="circle"></div>
        <p>Loading...</p>
      </div>
    </div>
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5); /* Màu nền mờ */
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        width: 150px;
        height: 150px;
      }

      .circle {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #4caf50; /* Màu xanh của spinner */
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
      }

      p {
        margin-top: 10px;
        font-size: 16px;
        color: #333;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingComponent {
  isLoading: boolean = false;

  start() {
    this.isLoading = true;
  }

  finish() {
    this.isLoading = false;
  }
}
