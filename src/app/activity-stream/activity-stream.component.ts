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
  test = {
      "@context": [
          "http://iiif.io/api/presentation/3/context.json",
          "https://www.w3.org/ns/activitystreams"],
      "id": "https://data.getty.edu/iiif/discovery.json",
      "type": "Collection",
      "label": "Example Big Collection",
      "total": 33000,
      "first": {
          "id": "https://data.getty.edu/iiif/discovery-1.json",
          "type": "CollectionPage"
      },
      "last": {
          "id": "https://data.getty.edu/iiif/discovery-10.json",
          "type": "CollectionPage"
      }
  }

  ngOnInit() {
      this.page = this.route.snapshot.paramMap.get('id');
      console.log(this.page)
      if (this.page === null){
          this.jsonData = {};
          this.jsonData['@context'] = [];
          this.jsonData['@context'].push('http://iiif.io/api/presentation/3/context.json');
          this.jsonData['@context'].push('https://www.w3.org/ns/activitystreams');
          this.jsonData['id'] = 'http://localhost:3071/activity_stream';
          this.jsonData['type'] = 'Collection';
          this.jsonData['label'] = 'CONTENTdm IIIF Collections';
          this.jsonData['first'] = {};
          this.jsonData['first']['id'] = 'http://localhost:3071/activity_stream/1';
          this.jsonData['first']['type'] = 'CollectionPage';
          var url = 'http://localhost:9200/activity_streams/_stats';
          this.httpService.getJson(url).then(data => {
              this.jsonData['total'] = data['_all']['primaries']['docs']['count'];
              var last = this.jsonData['total'] / 500;
              if (last % 1 != 0){
                  var lastPage = Math.floor(last + 1);
                  this.jsonData['last'] = {};
                  this.jsonData['last']['id'] = 'http://localhost:3071/activity_stream/'+lastPage;
                  this.jsonData['last']['type'] = 'CollectionPage';
              }
              else{
                  var lastPage = Math.floor(last);
                  this.jsonData['last'] = {};
                  this.jsonData['last']['id'] = 'http://localhost:3071/activity_stream/'+last;
                  this.jsonData['last']['type'] = 'CollectionPage'; 
              }
              console.log(last)
          });
      }
      else{
          this.jsonData = {};
          if (this.page == 1){
              var startingItem = 0;
          }
          else {
              var startingItem = this.page * 500 + 1; 
          }
          var url = 'http://52.204.112.237:3061/?action=search&size=500&from=' + startingItem;
          console.log(url);
          this.httpService.getJson(url).then(data => {
             this.jsonData = data; 
          });
      }
  }

}
