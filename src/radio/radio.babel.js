/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default class MaterialRadio {

  /**
   * Class constructor for Radio MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */
  constructor(element) {
    this.element_ = element;
    this.Constant_ = {
      TINY_TIMEOUT: 0.001
    };
    this.CssClasses_ = {
      IS_FOCUSED: 'mdl-radio--focused',
      IS_DISABLED: 'mdl-radio--disabled',
      IS_CHECKED: 'mdl-radio--checked',
      IS_UPGRADED: 'mdl-radio--upgraded',
      JS_RADIO: 'mdl-js-radio',
      RADIO_BTN: 'mdl-radio__button',
      RADIO_OUTER_CIRCLE: 'mdl-radio__outer-circle',
      RADIO_INNER_CIRCLE: 'mdl-radio__inner-circle'
    };

    this.btnElement_ = this.element_.querySelector('.' +
        this.CssClasses_.RADIO_BTN);

    this.btnElement_.addEventListener('change', this.onChange_.bind(this));
    this.btnElement_.addEventListener('focus', this.onChange_.bind(this));
    this.btnElement_.addEventListener('blur', this.onBlur_.bind(this));
    this.element_.addEventListener('mouseup', this.onMouseup_.bind(this));

    this.updateClasses_();
    this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
    this.element.MaterialRadio = this;
  }

  /**
   * Handle change of state.
   *
   * @private
   */
  onChange_() {
    var radios = document.querySelectorAll(
      'input[type="radio"][name="' + this.btnElement_.name + '"]');
    for (var i = 0, length = radios.length; i < length; i++) {
      radios[i].MaterialRadio.updateClasses();
    }
  }

  /**
   * Handle focus.
   *
   * @param {Event} event The event that fired.
   * @private
   */
   onFocus_() {
     this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
   }

   /**
    * Handle lost focus.
    *
    * @private
    */
    onBlur_() {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    }

    /**
     * Handle mouseup.
     *
     * @private
     */
     onMouseup_() {
       this.blur_();
     }

     /**
      * Update classes.
      *
      * @private
      */
      updateClasses_() {
        this.checkDisabled();
        this.checkToggleState();
      }

      /**
       * Add blur.
       *
       * @private
       */
      blur_() {
        // TODO: figure out why there's a focus event being fired after our blur,
        // so that we can avoid this hack.
        window.setTimeout(function() {
          this.btnElement_.blur();
        }.bind(this), /** @type {number} */ (this.Constant_.TINY_TIMEOUT));
      }

      /**
       * Check the components disabled state.
       *
       * @public
       */
      checkDisabled() {
        if (this.btnElement_.disabled) {
          this.element_.classList.add(this.CssClasses_.IS_DISABLED);
        } else {
          this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
        }
      }

      /**
       * Check the components toggled state.
       *
       * @public
       */
      checkToggleState() {
        if (this.btnElement_.checked) {
          this.element_.classList.add(this.CssClasses_.IS_CHECKED);
        } else {
          this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
        }
      }

      /**
       * Disable radio.
       *
       * @public
       */
      disable() {
        this.btnElement_.disabled = true;
        this.updateClasses_();
      }

      /**
      * Enable radio
      *
      * @public
      */
      enable() {
        this.btnElement_.disabled = false;
        this.updateClasses_();
      }

      /**
       * Check radio.
       *
       * @public
       */
      check() {
        this.btnElement_.checked = true;
        this.updateClasses_();
      }

      /**
       * Uncheck radio.
       *
       * @public
       */
      uncheck() {
        this.btnElement_.checked = false;
        this.updateClasses_();
      }
}
