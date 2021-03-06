// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnInit, OnDestroy, Injector, ElementRef } from '@angular/core';
import { CoreLoggerProvider } from '@providers/logger';
import { CoreQuestionBaseComponent } from '@core/question/classes/base-question-component';
import { AddonQtypeDdwtosQuestion } from '../classes/ddwtos';

/**
 * Component to render a drag-and-drop words into sentences question.
 */
@Component({
    selector: 'addon-qtype-ddwtos',
    templateUrl: 'addon-qtype-ddwtos.html'
})
export class AddonQtypeDdwtosComponent extends CoreQuestionBaseComponent implements OnInit, OnDestroy {

    protected element: HTMLElement;
    protected questionInstance: AddonQtypeDdwtosQuestion;
    protected inputIds: string[] = []; // Ids of the inputs of the question (where the answers will be stored).
    protected destroyed = false;

    constructor(protected loggerProvider: CoreLoggerProvider, injector: Injector, element: ElementRef) {
        super(loggerProvider, 'AddonQtypeDdwtosComponent', injector);

        this.element = element.nativeElement;
    }

    /**
     * Component being initialized.
     */
    ngOnInit(): void {
        if (!this.question) {
            this.logger.warn('Aborting because of no question received.');

            return this.questionHelper.showComponentError(this.onAbort);
        }

        const div = document.createElement('div');
        div.innerHTML = this.question.html;

        // Replace Moodle's correct/incorrect and feedback classes with our own.
        this.questionHelper.replaceCorrectnessClasses(div);
        this.questionHelper.replaceFeedbackClasses(div);

        // Treat the correct/incorrect icons.
        this.questionHelper.treatCorrectnessIcons(div);

        const answerContainer = div.querySelector('.answercontainer');
        if (!answerContainer) {
            this.logger.warn('Aborting because of an error parsing question.', this.question.name);

            return this.questionHelper.showComponentError(this.onAbort);
        }

        this.question.readOnly = answerContainer.classList.contains('readonly');
        this.question.answers = answerContainer.outerHTML;

        this.question.text = this.domUtils.getContentsOfElement(div, '.qtext');
        if (typeof this.question.text == 'undefined') {
            this.logger.warn('Aborting because of an error parsing question.', this.question.name);

            return this.questionHelper.showComponentError(this.onAbort);
        }

        // Get the inputs where the answers will be stored and add them to the question text.
        const inputEls = <HTMLElement[]> Array.from(div.querySelectorAll('input[type="hidden"]:not([name*=sequencecheck])'));

        inputEls.forEach((inputEl) => {
            this.question.text += inputEl.outerHTML;
            this.inputIds.push(inputEl.getAttribute('id'));
        });
    }

    /**
     * The question has been rendered.
     */
    questionRendered(): void {
        if (!this.destroyed) {
            // Create the instance.
            this.questionInstance = new AddonQtypeDdwtosQuestion(this.loggerProvider, this.domUtils, this.element, this.question,
                    this.question.readOnly, this.inputIds);

            this.questionHelper.treatCorrectnessIconsClicks(this.element, this.component, this.componentId);
        }
    }

    /**
     * Component being destroyed.
     */
    ngOnDestroy(): void {
        this.destroyed = true;
        this.questionInstance && this.questionInstance.destroy();
    }
}
