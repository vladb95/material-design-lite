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

export default class MaterialCheckbox {
  /**
   * Class constructor for Checkbox MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */
   constructor(element) {
     if (!element) {
       throw new Error('An element must be provided to MaterialCheckbox');
     }
     this.element_ = element;
     this.Constant_ = {
       TINY_TIMEOUT: 0.0001
     };
     this.CssClasses_ = {
       INPUT: 'mdl-checkbox__input',
       BOX_OUTLINE: 'mdl-checkbox__box-outline',
       FOCUS_HELPER: 'mdl-checkbox__focus-helper',
       TICK_OUTLINE: 'mdl-checkbox__tick-outline',
       IS_FOCUSED: 'mdl-checkbox--focused',
       IS_DISABLED: 'mdl-checkbox--disabled',
       IS_CHECKED: 'mdl-checkbox--checked',
       IS_UPGRADED: 'mdl-checkbox--upgraded'
     };
     this.inputElement_ = this.element_.querySelector('.' +
       this.CssClasses_.INPUT);

     this.inputElement_.addEventListener('change', this.onChange_.bind(this));
     this.inputElement_.addEventListener('focus', this.onFocus_.bind(this));
     this.inputElement_.addEventListener('blur', this.onBlur_.bind(this));
     this.element_.addEventListener('mouseup', this.onMouseUp_.bind(this));

     this.updateClasses_();
     this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
   }

  /**
   * Handle change of state.
   *
   * @private
   */
   onChange_() {
     this.updateClasses_();
   }

  /**
   * Handle focus of element.
   *
   * @private
   */
   onFocus_() {
     this.focus();
   }

  /**
   * Handle lost focus of element.
   *
   * @private
   */
   onBlur_() {
     this.blur();
   }

  /**
   * Handle mouseup.
   *
   * @private
   */
   onMouseUp_() {
     this.blur();
   }

  /**
   * Handle class updates.
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
       this.inputElement_.blur();
     }.bind(this), /** @type {number} */ (this.Constant_.TINY_TIMEOUT));
   }

   // Public methods

  /**
   * Check the inputs toggle state and update display.
   *
   * @public
   */
   checkToggleState() {
     if (this.inputElement_.checked) {
       this.element_.classList.add(this.CssClasses_.IS_CHECKED);
     } else {
       this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
     }
   }

  /**
   * Check the inputs disabled state and update display.
   *
   * @public
   */
   checkDisabled() {
     if (this.inputElement_.disabled) {
       this.element_.classList.add(this.CssClasses_.IS_DISABLED);
     } else {
       this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
     }
   }

  /**
   * Disable checkbox.
   *
   * @public
   */
   disable() {
     this.inputElement_.disabled = true;
     this.updateClasses_();
   }

  /**
   * Enable checkbox.
   *
   * @public
   */
   enable() {
     this.inputElement_.disabled = false;
     this.updateClasses_();
   }

  /**
   * Check checkbox.
   *
   * @public
   */
   check() {
     this.inputElement_.checked = true;
     this.updateClasses_();
   }

  /**
   * Uncheck checkbox.
   *
   * @public
   */
   uncheck() {
     this.inputElement_.checked = false;
     this.updateClasses_();
   }

  focus() {
    this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
  }

  blur() {
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
  }
}
