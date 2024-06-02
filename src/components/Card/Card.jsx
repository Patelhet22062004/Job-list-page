import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';

function Card() {
    const [jobs, setjobs] = useState([]);
    const [filteredjob, setFilteredjob] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchjobData();
    }, []);


    const fetchjobData = async () => {
        try {
            const response = await fetch('https://znl82lbl3wjg.share.zrok.io/job-list');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setjobs(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching job data:', error);
        }
    };
    
    useEffect(() => {
        if (jobs) {
            const filtered = jobs.filter((job) =>
                job.company.toLowerCase().includes(searchInput.toLowerCase())  ||
                job.title.toLowerCase().includes(searchInput.toLowerCase()) || 
                job.technologies[0].toLowerCase().includes(searchInput.toLowerCase()) ||
                job.technologies[1].toLowerCase().includes(searchInput.toLowerCase()) ||
                job.location.toLowerCase().includes(searchInput.toLowerCase())
            );
            setFilteredjob(filtered);
        }
        
    }, [jobs, searchInput]);
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };
    return (
        <>


            <div className='bg-sky-100'>
                <div className='flex justify-center pt-4 gap-2'>
                    <div className='flex items-center mb-4'>
                        <BiSearch className='mr-2 h-6 w-6' />
                        <input
                            id="text"
                            name="text"
                            type="text"
                            placeholder='Search jobs...'
                            autoComplete="text"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            required
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (

                  
                    <div>
                    {filteredjob.map((job) => {
                            return (
                                <div className='py-8 md:px-48 sm:px-28  '>
                                    <div className='flex md:flex-row flex-col  justify-between p-4 mx-3 rounded-lg shadow-md bg-white'>
                                        <div className='flex flex-row gap-5'>
                                            <div className='flex items-center  text-white font-semibold justify-center flex-wrap  h-20 w-20 md:w-28 md:h-28 bg-sky-400 rounded-full'> {job.company}</div>
                                            <div className='flex flex-col gap-2 '>
                                                <div className='text-sky-300 sm:text-lg font-semibold'>{job.company}</div>
                                                <div className='font-bold sm:text-xl'>{job.title}</div>
                                                <div> <ul className='flex gap-2 text-sm flex-wrap'>
                                                    <li>{job.posted_ago}</li>
                                                    <li>{job.type}</li>
                                                    <li>{job.location}</li>
                                                </ul></div>

                                            </div>

                                        </div>
                                        <div className='my-6 flex gap-2 justify-center flex-wrap items-center'>
                                            <button className='transition-all ease-in-out rounded-sm delay-150 bg-sky-50 px-2 hover:scale-110 hover:bg-sky-100 duration-300 text-sky-500 text-sm sm:text-lg font-semibold '>{job.technologies[0]}</button>
                                            <button className='transition-all ease-in-out rounded-sm delay-150 bg-sky-50 px-2 hover:scale-110 hover:bg-sky-100 duration-300 text-sky-500 text-sm sm:text-lg font-semibold' >{job.technologies[1]}</button>
                                            <button className='transition-all ease-in-out rounded-sm delay-150 bg-sky-50 px-2 hover:scale-110 hover:bg-sky-100 duration-300 text-sky-500 text-sm sm:text-lg font-semibold' >{job.technologies[2]}</button>
                                            <button className='transition-all ease-in-out rounded-sm delay-150 bg-sky-50 px-2 hover:scale-110 hover:bg-sky-100 duration-300 text-sky-500 text-sm sm:text-lg font-semibold' >{job.technologies[3]}</button>
                                            <button className='transition-all ease-in-out rounded-sm delay-150 bg-sky-50 px-2 hover:scale-110 hover:bg-sky-100 duration-300 text-sky-500 text-sm sm:text-lg font-semibold '>{job.technologies[4]}</button>
                                            <button className='transition-all ease-in-out rounded-sm delay-150 bg-sky-50 px-2 hover:scale-110 hover:bg-sky-100 duration-300 text-sky-500 text-sm sm:text-lg font-semibold '>{job.technologies[5]}</button>

                                        </div>
                                    </div></div>

                            );
                        })}
</div>
                )}

            </div>
        </>
    );
}

export default Card
