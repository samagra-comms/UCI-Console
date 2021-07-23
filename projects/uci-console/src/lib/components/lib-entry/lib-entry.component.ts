import {ActivatedRoute, Router} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UciEventsService} from '../../uci-events.service';
import {IdiscussionConfig} from '../../models/discussion-config.model';
import {ConfigService} from '../../services/config.service';
import {UciService} from '../../services/uci.service';
import {TelemetryUtilsService} from '../../telemetry-utils.service';
import {NSDiscussData} from '../../models/discuss.model';
import {GlobalService} from '../../services/global.service';

@Component({
    selector: 'lib-lib-entry',
    templateUrl: './lib-entry.component.html',
    styleUrls: ['./lib-entry.component.scss']
})
export class LibEntryComponent implements OnInit {
    @Input() user;
    @Input() baseUrl;

    constructor(
        public activatedRoute: ActivatedRoute,
        private uciService: UciService,
        private configService: ConfigService,
        private location: Location,
        private uciEventsService: UciEventsService,
        private telemetryUtils: TelemetryUtilsService,
        private globalService: GlobalService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        console.log('user log is here', this.user);
        if (this.user) {
            this.globalService.setUser(this.user);
        }
        console.log('baseUrl log is here', this.baseUrl);
        if (this.baseUrl) {
            this.globalService.setBaseUrl(this.baseUrl);
        }
        console.log('zzz', this.router.url);
        if (this.router.url === '/uci-admin') {
            this.router.navigate(['uci-admin/home']);
        }
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
