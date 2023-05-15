import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { ExcelOutline, PDFOutline } from '../../assets/icons';

const ModalGenerateReport = () => {
	const [open, setOpen] = useState(false);

	const handleToggleModal = (shouldClose) => {
		setOpen(!shouldClose);
	};
	const handleGeneratePDF = () => {
		const doc = new jsPDF();
		autoTable(doc, { html: '#phone-table' });
		doc.save('teléfonos-usuarios.pdf');
	};
	const handleGenerateExcel = () => {
		const table = document.getElementById('phone-table');
		const workbook = XLSX.utils.table_to_book(table);
		XLSX.writeFile(workbook, 'teléfonos-usuarios.xls');
	};

	return (
		<div>
			<button
				id='generate-report'
				className='text-xs text-white sm:text-base'
				onClick={() => handleToggleModal(false)}></button>
			{open && (
				<div className='fixed inset-0 z-10 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50 px-0 sm:px-20 lg:px-40 xl:px-72'>
					<div className='w-72 rounded-lg border border-lime-400 bg-slate-200 bg-opacity-90 py-5 sm:mt-52 xl:w-80 '>
						<div className='flex justify-center gap-20'>
							<h2 className='text-center text-slate-700'>Generar reporte</h2>
							<button
								className='cursor-pointer font-semibold text-slate-700 transition-colors duration-300 hover:text-slate-900'
								onClick={handleToggleModal}>
								X
							</button>
						</div>
						{/*  Buttons */}
						<div className='mt-5 flex justify-center gap-4 text-xs font-medium xl:text-sm'>
							<button
								className='flex w-24 items-center justify-center gap-2 rounded-lg 
                                           bg-gradient-to-r from-red-500 via-red-600 to-red-700 
                                           py-1 text-slate-200 hover:bg-gradient-to-r
                                         hover:from-red-600 hover:via-red-700 hover:to-red-800'
								onClick={handleGeneratePDF}>
								<PDFOutline />
								<span>PDF</span>
							</button>
							<button
								className='flex w-24 items-center justify-center gap-2 rounded-lg bg-gradient-to-r
                                         from-green-500 via-green-600 to-green-700 py-1 text-slate-200 
                                           hover:bg-gradient-to-r hover:from-green-600 hover:via-green-700 hover:to-green-800'
								onClick={handleGenerateExcel}>
								<ExcelOutline />
								<span>Excel</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ModalGenerateReport;
