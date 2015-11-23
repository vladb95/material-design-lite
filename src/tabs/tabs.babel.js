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

export default class MaterialTabs {
  /**
   * Class constructor for Tabs MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */
  constructor(element) {
    this.element_ = element;
    this.CssClasses_ = {
      TAB_CLASS: 'mdl-tabs__tab',
      PANEL_CLASS: 'mdl-tabs__panel',
      ACTIVE_CLASS: 'mdl-tabs--active',
      UPGRADED_CLASS: 'mdl-tabs--upgraded'
    };

    this.tabs_ = this.element_.querySelectorAll(
      '.' + this.CssClasses_.TAB_CLASS);
    this.panels_ =
        this.element_.querySelectorAll('.' + this.CssClasses_.PANEL_CLASS);

    /**
     * Constructor for an individual tab.
     *
     * @constructor
     * @param {HTMLElement} tab The HTML element for the tab.
     * @param {MaterialTabs} ctx The MaterialTabs object that owns the tab.
     */
    function materialTab(tab, ctx) {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        var href = tab.href.split('#')[1];
        var panel = ctx.element_.querySelector('#' + href);
        ctx.resetTabState_();
        ctx.resetPanelState_();
        tab.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
        panel.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
      });
    }

    for (var i = 0; i < this.tabs_.length; i++) {
      materialTab(this.tabs_[i], this);
    }

    this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);
  }

  /**
   * Reset tab state, dropping active classes
   *
   * @private
   */
  resetTabState_() {
    for (var k = 0; k < this.tabs_.length; k++) {
      this.tabs_[k].classList.remove(this.CssClasses_.ACTIVE_CLASS);
    }
  }

  /**
   * Reset panel state, droping active classes
   *
   * @private
   */
  resetPanelState_() {
    for (var j = 0; j < this.panels_.length; j++) {
      this.panels_[j].classList.remove(this.CssClasses_.ACTIVE_CLASS);
    }
  }
}
