import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-activity-stream',
  templateUrl: './activity-stream.component.html',
  styleUrls: ['./activity-stream.component.css']
})
export class ActivityStreamComponent implements OnInit {

  constructor(
          private httpService: HttpService,
          private route: ActivatedRoute
  ) { }
  jsonData = {};
  page = null;

  ngOnInit() {
      this.page = this.route.snapshot.paramMap.get('id');
      console.log(this.page)
      if (this.page === null){
          this.jsonData = {};
          this.jsonData['@context'] = [];
          this.jsonData['@context'].push('http://iiif.io/api/presentation/3/context.json');
          this.jsonData['@context'].push('https://www.w3.org/ns/activitystreams');
          this.jsonData['id'] = 'http://52.204.112.237/iiif_activity_streams/activity_stream/';
          this.jsonData['type'] = 'Collection';
          this.jsonData['label'] = 'CONTENTdm IIIF Collections';
          this.jsonData['first'] = {};
          this.jsonData['first']['id'] = 'http://52.204.112.237/iiif_activity_streams/activity_stream/1';
          this.jsonData['first']['type'] = 'CollectionPage';
          var url = 'http://52.204.112.237:3061/?action=count';
          this.httpService.getJson(url).then(data => {
              var total = data.count;
              console.log(total);
              var last = Number(total) / 5000;
              if (last % 1 != 0){
                  var lastPage = Math.floor(last + 1);
                  this.jsonData['last'] = {};
                  this.jsonData['last']['id'] = 'http://52.204.112.237/iiif_activity_streams/activity_stream/'+lastPage;
                  this.jsonData['last']['type'] = 'CollectionPage';
              }
              else{
                  var lastPage = Math.floor(last);
                  this.jsonData['last'] = {};
                  this.jsonData['last']['id'] = 'http://52.204.112.237/iiif_activity_streams/activity_stream/'+last;
                  this.jsonData['last']['type'] = 'CollectionPage'; 
              }
              console.log(last)
           });
      }
      else{
          this.jsonData = {};
          var url = 'http://52.204.112.237:3061/?action=paging&page=' + this.page;
          console.log(url);
          var nextPage = (Number(this.page) + Number(1));
          var previousPage = (Number(this.page) - Number(1));
          console.log(previousPage);
          console.log(nextPage);
          this.httpService.getJson(url).then(data => {
             this.jsonData = data;
             //this.jsonData['type'] = 'CollectionPage';
             this.jsonData['partOf'] = 'http://52.204.112.237/iiif_activity_streams/activity_stream/';
             if (data.items.length === 500) {
                 this.jsonData['next'] = {};
                 this.jsonData['next']['type'] = 'CollectionPage';
                 this.jsonData['next']['id'] = 'http://52.204.112.237/iiif_activity_streams/activity_stream/' + nextPage;
             }
             if (this.page > 1) {
                 this.jsonData['previous'] = {};
                 this.jsonData['previous']['type'] = 'CollectionPage';
                 this.jsonData['previous']['id'] = 'http://52.204.112.237/iiif_activity_streams/activity_stream/' + previousPage;
             }
             
          });
      }
  }

}
