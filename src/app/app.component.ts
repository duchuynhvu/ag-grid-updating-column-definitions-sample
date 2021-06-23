import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //#1.Tạo objects cho việc truy cập tới grid
  private gridApi: any;
  private gridColumnApi: any;

  rowData: any;
  public modules: any = [ClientSideRowModelModule];

  //#2.Cài đặt mặc định áp dụng cho tất cả các column
  defaultColDef = {
    initialWidth: 100,
    sortable: true,
    resizable: true,
  };

  //Cài đặt constructor
  constructor(private http: HttpClient) {}

  //#3.1 Xử lý sự kiện ngay khi grid được khởi tạo
  onGridReady(params: any) {
    //Khởi tạo object truy cập tới grid
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    //Tải dữ liệu, hiện thị lên grid
    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.onBtIncludeMedalColumns();
        this.rowData = data;
      });
  }

  //#3.2.Xử lý sự kiện loại bỏ columns
  onBtExcludeMedalColumns() {
    this.gridApi.setColumnDefs(colDefsMedalsExcluded);
  }

  //#3.3.Xử lý sự kiện thêm columns
  onBtIncludeMedalColumns() {
    this.gridApi.setColumnDefs(colDefsMedalsIncluded);
  }
}

//#4.Cài đặt columns cho "Include Medal Columns"
var colDefsMedalsIncluded = [
  { field: 'athlete' },
  { field: 'age' },
  { field: 'country' },
  { field: 'sport' },
  { field: 'year' },
  { field: 'date' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
];

//#5.Cài đặt columns cho "Exclude Medal Columns"
var colDefsMedalsExcluded = [
  { field: 'athlete' },
  { field: 'age' },
  { field: 'country' },
  { field: 'sport' },
  { field: 'year' },
  { field: 'date' },
];
