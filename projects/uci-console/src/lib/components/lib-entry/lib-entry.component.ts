import {ActivatedRoute} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UciEventsService} from '../../uci-events.service';
import {IdiscussionConfig} from '../../models/discussion-config.model';
import {ConfigService} from '../../services/config.service';
import {UciService} from '../../services/uci.service';
import {TelemetryUtilsService} from '../../telemetry-utils.service';
import {NSDiscussData} from '../../models/discuss.model';

@Component({
    selector: 'lib-lib-entry',
    templateUrl: './lib-entry.component.html',
    styleUrls: ['./lib-entry.component.scss']
})
export class LibEntryComponent implements OnInit {
    @Input() user;
    data: IdiscussionConfig;

    constructor(
        public activatedRoute: ActivatedRoute,
        private uciService: UciService,
        private configService: ConfigService,
        private location: Location,
        private uciEventsService: UciEventsService,
        private telemetryUtils: TelemetryUtilsService
    ) {
    }

    ngOnInit(): void {
        console.log('user log', this.user);
    }

    goBack(): void {
        this.location.back();
    }

    close(event): void {
        const eventAction = {
            action: 'DF_CLOSE'
        };
        this.uciEventsService.emitTelemetry(eventAction);
        this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.LIB_ENTRY);
    }
}
