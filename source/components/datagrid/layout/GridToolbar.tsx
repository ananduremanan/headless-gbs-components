import React from "react";
import {
  exportToExcelHelper,
  exportToPDFHelper,
} from "@grampro/headless-helpers";
import Icon from "../../icon/Icon";
import { search } from "../../icon/iconPaths";
import { useGridContext } from "../context/GridContext";

const GridToolbar = () => {
  const {
    searchParam,
    handleSearchInput,
    handleSearch,
    enableSearch,
    onSearch,
    enableExcelExport,
    enablePdfExport,
    workingDataSource,
    columns,
    excelName,
    pdfName,
    pdfOptions,
    gridButtonClass,
    onToolbarButtonClick,
    lazy,
  } = useGridContext();

  if (!enableSearch && !enableExcelExport && !enablePdfExport) {
    return null;
  }

  return (
    <div className="flex bg-zinc-100 dark:bg-zinc-900 justify-end space-x-2 px-2 py-4">
      {/* Search input */}
      {enableSearch && (
        <div className="flex">
          <input
            type="search"
            defaultValue={searchParam}
            onChange={handleSearchInput}
            placeholder="Search..."
            className="outline-none p-2 text-xs rounded-lg max-sm:hidden dark:bg-zinc-800 bg-zinc-200"
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Enter") {
                handleSearch(searchParam);
              }
            }}
          />
          <button
            className="rounded-lg w-10 flex items-center justify-center cursor-pointer"
            onClick={() => {
              handleSearch(searchParam);
              if (onSearch) onSearch(searchParam); // Call the onSearch prop if provided
            }}
          >
            <Icon
              elements={search}
              svgClass={"stroke-gray-500 fill-none dark:stroke-white"}
            />
          </button>
        </div>
      )}

      {/* Export buttons */}
      {(enableExcelExport || enablePdfExport) && (
        <div className="flex space-x-2">
          {enableExcelExport && (
            <button
              className={gridButtonClass}
              onClick={() => {
                console.log("clicked", lazy.toString());
                if (!lazy) {
                  exportToExcelHelper(workingDataSource, columns, excelName);
                }

                if (onToolbarButtonClick) onToolbarButtonClick("excelExport");
              }}
            >
              Export to Excel
            </button>
          )}

          {enablePdfExport && (
            <button
              className={gridButtonClass}
              onClick={() => {
                if (!lazy) {
                  exportToPDFHelper(
                    workingDataSource,
                    columns,
                    pdfName,
                    pdfOptions
                  );
                }
                if (onToolbarButtonClick) onToolbarButtonClick("pdfExport");
              }}
            >
              Export to PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GridToolbar;
