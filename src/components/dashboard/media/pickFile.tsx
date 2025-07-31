import FileState from '@/state/fileState';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

function PickFile({onFileSelect}: {onFileSelect: (file: string) => void}) {
    const { fileList, getFileList } = FileState();
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(10);

    const handleFileSelect = (file: string) => {
        onFileSelect(file);
    }

    useEffect(() => {
        (async () => await getFileList((pageNo - 1) * limit, limit))();
    }, []);

    return (
        <div>
            <div className="flex justify-end">
                <div onClick={() => { document.getElementById('pickFile')?.classList.toggle('hidden'); document.getElementById('pickFile')?.classList.toggle('flex') }} className='bg-green-600 hover:bg-green-700 text-white cursor-pointer py-2 px-4 rounded w-fit'>Select File</div>
            </div>
            <div id='pickFile' className="hidden w-full h-full items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-[#00000050]">
                <div className='max-w-[600px] h-[60vh] bg-gray-200 p-4 rounded flex flex-col items-center gap-4 relative' >
                    <div className="flex justify-between items-center w-full">
                        <h1 className='text-2xl font-bold'>File List</h1>
                        <div onClick={() => { document.getElementById('pickFile')?.classList.toggle('hidden'); document.getElementById('pickFile')?.classList.toggle('flex') }} className='bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white cursor-pointer p-2 rounded'><i className='bi bi-x-lg'></i></div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 w-full">
                        {
                            fileList && fileList.map((item: any, i: number) => (
                                <div key={i} onClick={()=>handleFileSelect(item.url)}>
                                    <Image src={item.url ?? '/image.svg'} alt={item.name} title={item.name} width={1200} height={1200} className='w-full h-auto object-contain rounded-lg' loading='lazy' />
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-center items-center gap-4 w-full py-2 absolute bottom-0">
                        <button onClick={() => setPageNo(pageNo - 1)} className="bg-green-600 hover:bg-green-700 text-white cursor-pointer py-2 px-4 rounded" disabled={pageNo === 1}>Previous</button>
                        <span>{pageNo} of {Math.ceil(fileList?.length / limit)}</span>
                        <button onClick={() => setPageNo(pageNo + 1)} className="bg-green-600 hover:bg-green-700 text-white cursor-pointer py-2 px-4 rounded" disabled={pageNo === Math.ceil(fileList?.length / limit)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PickFile;