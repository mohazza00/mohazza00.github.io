  class ThemeCustomization extends HTMLElement {
    constructor() {
      this.innerHTML = `    
      <div class="customize-theme">
      <div class="card">
        <h2>Customize your view</h2>
        <p>Modify the font size, color and background</p>
        <!-- font size -->
        <div class="font-size">
          <h3>Font Size</h3>
          <div>
            <h6>Aa</h6>
            <div class="select-size">
              <span class="font-size-1"></span>
              <span class="font-size-2"></span>
              <span class="font-size-3 active"></span>
              <span class="font-size-4"></span>
            </div>
            <h3>Aa</h3>
          </div>
        </div>
        <!-- color -->
        <div class="color">
          <h3>Color</h3>
          <div class="select-color">
            <span class="color-1"></span>
            <span class="color-2"></span>
            <span class="color-3 active"></span>
            <span class="color-4"></span>
            <span class="color-5"></span>
          </div>
        </div>
        <!-- background -->
        <div class="background">
          <h3>Background</h3>
          <div class="select-bg">
            <div class="bg-1 active">
              <span></span>
              <h5 for="bg-1">Light</h5>
            </div>
            <div class="bg-2">
              <span></span>
              <h5 for="bg-3">Dark</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
    }
  }

  customElements.define('customize-theme', ThemeCustomization);
