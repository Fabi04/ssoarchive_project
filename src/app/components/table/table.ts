import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-responsive-dt';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class TableComponent implements AfterViewInit {

  data: any[] = [];

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {

    this.http.get<any[]>('http://localhost/ssoarchive/api/get_breeds.php')
      .subscribe(breeds => {

        this.data = breeds;

        const table = ($('#horses') as any);

        if ($.fn.dataTable.isDataTable('#horses')) {
          table.DataTable().clear().destroy();
        }


        $.fn.dataTable.ext.search = $.fn.dataTable.ext.search.filter(
          fn => fn.name !== 'customTypeFilter'
        );






        const customFilter = (settings: any, data: any) => {

          const selectedTypes: string[] = [];
          const selectedColors: string[] = [];
          const selectedGenerations: string[] = [];

          $('.typeFilter:checked').each(function () {
            const value = $(this).val();
            if (typeof value === 'string') selectedTypes.push(value);
          });

          $('.colorFilter:checked').each(function () {
            const value = $(this).val();
            if (typeof value === 'string') selectedColors.push(value);
          });
          $('.generationFilter:checked').each(function () {
            const value = $(this).val();
            if (typeof value === 'string') selectedGenerations.push(value);
          });


          const horseType = data[4] || data[9];
          const coatColor = data[2];
          const generation = data[8];


          if (selectedTypes.length === 0 && selectedColors.length === 0 && selectedGenerations.length === 0) {
            return true;
          }


          const typeMatch =
            selectedTypes.length === 0 ||
            selectedTypes.includes(horseType);

          // COLOR check (OR)
          const colorMatch =
            selectedColors.length === 0 ||
            selectedColors.includes(coatColor);

          const generationMatch =
            selectedGenerations.length === 0 ||
            selectedGenerations.includes(generation);

          // AND kapcsolat köztük
          return typeMatch && colorMatch && generationMatch;
        };

        Object.defineProperty(customFilter, 'name', {
          value: 'customTypeFilter'
        });

        $.fn.dataTable.ext.search.push(customFilter);

        const tableApi = table.DataTable({
          responsive: {
            details: {
              type: 'inline',
              target: 'tr'
            }
          },

          data: this.data.map(item => [
            `<img src="http://localhost/ssoarchive/images/${item.coat_image.trim()}" class="horse-img" />`,
            item.breed_name,
            item.coat_name,
            item.breed_desc,
            item.breed_type,
            item.breed_price,
            item.breed_requirement,
            item.breed_location,
            item.breed_generation,
            item.horse_type2
          ]),

          columns: [
            { title: 'Image', className: 'text-center' },
            { title: 'Breed', className: 'text-center align-middle' },
            { title: 'Coat', className: 'text-center align-middle' },
            { title: 'Description', className: 'text-center align-middle', visible: false },
            { title: 'Type', className: 'text-center align-middle' },
            { title: 'Price', className: 'text-center align-middle' },
            { title: 'Level Requirement', className: 'text-center align-middle' },
            { title: 'Location', className: 'text-center align-middle' },
            { title: 'Generation', className: 'text-center align-middle' },
            { title: 'HorseType', className: 'text-center align-middle', visible: false }
          ],

          columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: 1 },
            { responsivePriority: 3, targets: 2 },
            { responsivePriority: 100, targets: 3 },
            { responsivePriority: 100, targets: 5 },
            { responsivePriority: 100, targets: 6 }
          ],

          order: [[2, 'asc']]
        });

        $('.typeFilter, .colorFilter, .generationFilter').on('change', () => {
          tableApi.draw();
        });

      });
  }
}