import React from 'react';

interface TableRendererProps {
  data: string[][];
}

const TableRenderer: React.FC<TableRendererProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const headers = data[0];
  const rows = data.slice(1);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 border-b text-left">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4 border-b">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRenderer; 