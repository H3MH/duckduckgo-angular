import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { NbSearchService } from "@nebular/theme";

export interface Value {
  altitude?: any;
  globe: string;
  latitude: number;
  longitude: number;
  precision: number;
  amount: string;
  unit: string;
}

export interface Content {
  data_type: string;
  label: string;
  value: Value;
  wiki_order: string;
}

export interface Infobox {
  content: Content[];
}

export interface Icon {
  Height: string;
  URL: string;
  Width: string;
}

export interface RelatedTopic {
  FirstURL: string;
  Icon: Icon;
  Result: string;
  Text: string;
}

export interface Icon2 {
  Height: number;
  URL: string;
  Width: number;
}

export interface Result {
  FirstURL: string;
  Icon: Icon2;
  Result: string;
  Text: string;
}

export interface Developer {
  name: string;
  type: string;
  url: string;
}

export interface Maintainer {
  github: string;
}

export interface SrcOptions {
  directory: string;
  is_fanon: number;
  is_mediawiki: number;
  is_wikipedia: number;
  language: string;
  min_abstract_length: string;
  skip_abstract: number;
  skip_abstract_paren: number;
  skip_end: string;
  skip_icon: number;
  skip_image_name: number;
  skip_qr: string;
  source_skip: string;
  src_info: string;
}

export interface Meta {
  attribution?: any;
  blockgroup?: any;
  created_date?: any;
  description: string;
  designer?: any;
  dev_date?: any;
  dev_milestone: string;
  developer: Developer[];
  example_query: string;
  id: string;
  is_stackexchange?: any;
  js_callback_name: string;
  live_date?: any;
  maintainer: Maintainer;
  name: string;
  perl_module: string;
  producer?: any;
  production_state: string;
  repo: string;
  signal_from: string;
  src_domain: string;
  src_id: number;
  src_name: string;
  src_options: SrcOptions;
  src_url?: any;
  status: string;
  tab: string;
  topic: string[];
  unsafe: number;
}

export interface RootObject {
  Abstract: string;
  AbstractSource: string;
  AbstractText: string;
  AbstractURL: string;
  Answer: string;
  AnswerType: string;
  Definition: string;
  DefinitionSource: string;
  DefinitionURL: string;
  Entity: string;
  Heading: string;
  Image: string;
  ImageHeight: number;
  ImageIsLogo: number;
  ImageWidth: number;
  Infobox: Infobox;
  Redirect: string;
  RelatedTopics: RelatedTopic[];
  Results: Result[];
  Type: string;
  meta: Meta;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  search: any;
  timeout = null;
  show = false;
  searchTickers: RootObject;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private dialogService: NbDialogService,
    private http: HttpClient,
    private searchService: NbSearchService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.searchFunc(data.term);
    });
  }

  ngOnInit() {}

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  open() {
    this.show = true;
  }
  hide() {
    this.show = false;
  }

  getImage(symbol: any) {
    return `https://api.duckduckgo.com${symbol}`;
  }

  fetchResults(symbol, count) {
    if (!symbol) this.hide();
    this.http
      .get<RootObject>(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(
          symbol
        )}&format=json`
      )
      .subscribe(data => {
        console.log(data);
        this.searchTickers = data;
      });
  }

  searchFunc(val) {
    console.log(val);
    this.search = val;
    if (val != "" && val != undefined) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.show = true;

        this.fetchResults(this.search, 10);
      }, 500);
    } else {
      this.hide();
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(",")
        .map(str => +str);
    }
  }
}
