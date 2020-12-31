import { DiscussionService } from './../../services/discussion.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

/* tslint:disable */
import * as _ from 'lodash'
/* tslint:enable */

@Component({
  selector: 'lib-side-pannel',
  templateUrl: './side-pannel.component.html',
  styleUrls: ['./side-pannel.component.css']
})
export class SidePannelComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription;

  userName: string;

  defaultPage = 'categories';

  queryParams: any;

  constructor(
    public router: Router,
    public discussService: DiscussionService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // TODO: loader or spinner
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe((params) => {
      console.log('params', params);
      this.queryParams = params;
      this.discussService.userName = _.get(params, 'userName');
      const rawCategories = JSON.parse(_.get(params, 'categories'));
      this.discussService.forumIds = _.get(rawCategories , 'result');
    });
    this.discussService.initializeUserDetails(_.get(this.queryParams, 'userName'));
    if (this.discussService.forumIds) {
      this.navigate(this.defaultPage);
    } else {
      // TODO: Error toast
      console.log('forum ids not found');
    }
  }

  navigate(pageName: string) {
    this.router.navigate([`/discussions/${pageName}`], { queryParams: this.queryParams });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}