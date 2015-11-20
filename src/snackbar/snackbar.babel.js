/**
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
export class MaterialSnackbar {

  /**
   * Class constructor for Snackbar MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */
  constructor(element) {
    this.element_ = element;
    this.active = false;
    this.cssClasses_ = {
      SNACKBAR: 'mdl-snackbar',
      MESSAGE: 'mdl-snackbar__text',
      ACTION: 'mdl-snackbar__action',
      ACTIVE: 'mdl-snackbar--active'
    };
    this.queuedNotifications_ = [];
    this.textElement_ = this.element_.querySelector(this.cssClasses_.MESSAGE);
    this.actionElement_ = this.element_.querySelector(this.cssClasses_.ACTION);
    this.element_.setAttribute('aria-hidden', true);

    // Initializing individual message properties.
    this.message_ = undefined;
    this.actionText_ = undefined;
    this.actionHandler_ = undefined;
    this.timeout_ = undefined;
  }

  createSnackbar_() {
    if (this.actionHandler_) {
      this.actionElement_.removeAttribute('hidden');
      this.actionElement_.textContent = this.actionText_;
      this.actionElement_.addEventListener('click', this.actionHandler_);
    }
    this.textElement_.textContent = this.message_;
    this.element_.setAttribute('aria-hidden', false);
    this.element_.classList.add(this.cssClasses_.ACTIVE);
    setTimeout(this.cleanup_.bind(this), this.timeout_);
  }

  setDefaults_() {
    this.textElement_.textContent = '';
    if (this.actionText_) {
      this.actionElement_.textContent = '';
    }
    this.actionHandler_ = undefined;
    this.message_ = undefined;
    this.actionText_ = undefined;
  }

  checkQueue_() {
    if (this.queuedNotifications_.length > 0) {
      this.showSnackbar(this.queuedNotifications_.shift());
    }
  }

  cleanup_() {
    this.element_.classList.remove(this.cssClasses_.ACTIVE);
    this.element_.setAttribute('aria-hidden', true);
    if (this.actionElement_) {
      this.actionElement_.removeEventListener('click', this.actionHandler_);
    }
    this.setDefaults_();
    this.active = false;
    this.checkQueue_();
  }

  showSnackbar(data) {
    if (data === undefined) {
      throw new Error(
        'Please provide a data object with at least a message to display.');
    }
    if (data['message'] === undefined) {
      throw new Error('Please provide a message to be displayed.');
    }
    if (data['actionHandler'] && !data['actionText']) {
      throw new Error('Please provide action text with the handler.');
    }
    if (this.active) {
      this.queuedNotifications_.push(data);
    } else {
      this.active = true;
      this.message_ = data['message'];
      if (data['timeout']) {
        this.timeout_ = data['timeout'];
      } else {
        this.timeout_ = 8000;
      }
      if (data['actionHandler']) {
        this.actionHandler_ = data['actionHandler'];
      }
      if (data['actionText']) {
        this.actionText_ = data['actionText'];
      }
      this.createSnackbar_();
    }
  }
}
