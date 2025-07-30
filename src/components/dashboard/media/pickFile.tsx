import FileState from '@/state/fileState';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

function PickFile() {
    const { fileList, getFileList } = FileState();
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        (async () => await getFileList((pageNo - 1) * limit, limit))();
    }, [pageNo]);

    return (
        <div>
            <div className="flex justify-end">
                <div onClick={() => { document.getElementById('pickFile')?.classList.toggle('hidden'); document.getElementById('pickFile')?.classList.toggle('flex') }} className='bg-gray-300 hover:bg-gray-400 text-white cursor-pointer py-2 px-4 rounded'>Select File</div>
            </div>
            <div id='pickFile' className="hidden bg-gray-300 absolute top-0 left-0 right-0 bottom-0 translate-x-0 translate-y-0 p-4 z-50 w-full h-full overflow-y-auto overflow-x-hidden rounded shadow-lg flex-col gap-4 items-center justify-center">
                <div className='max-w-[600px] h-[60vh] bg-gray-200 p-4 rounded'>
                    <div className="flex justify-end">
                        <div onClick={() => { document.getElementById('pickFile')?.classList.toggle('hidden'); document.getElementById('pickFile')?.classList.toggle('flex') }} className='bg-gray-300 hover:bg-gray-400 text-white cursor-pointer py-2 px-4 rounded'>Close</div>
                    </div>
                    <h1>File List</h1>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            fileList && fileList.map((item: any, i: number) => (
                                <div key={i} className="flex flex-col gap-2 relative">
                                    <Image src={item.url ?? '/image.svg'} alt={item.name} title={item.name} width={1200} height={1200} className='w-full h-auto object-contain rounded-lg' loading='lazy' />
                                    <div className="flex flex-col gap-2">
                                        <h3 className='text-xs truncate'>{item.name}</h3>
                                        <p className='text-xs w-fit'>Category: {item.category[0].name}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-center">
                        <button onClick={() => setPageNo(pageNo - 1)} className="bg-gray-300 hover:bg-gray-400 text-white cursor-pointer py-2 px-4 rounded" disabled={pageNo === 1}>Previous</button>
                        <button onClick={() => setPageNo(pageNo + 1)} className="bg-gray-300 hover:bg-gray-400 text-white cursor-pointer py-2 px-4 rounded" disabled={pageNo === Math.ceil(fileList?.length / limit)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PickFile;