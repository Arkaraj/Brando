/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
const Contact = () => {
    return (
        <>
            <div className="m-6">
                <h1 className="text-xl font-bold leading-none text-black sm:text-2xl md:text-4xl">Contact</h1>
            </div>

            <div className="container px-5 py-12 mx-auto flex-col">
                <img className="shadow sm:w-12 sm:h-12 w-10 h-10 rounded-full relative z-20 top-8 mx-auto" src="https://tailwindtemplates.io/wp-content/uploads/2019/03/link.jpg" alt="Avatar" />
                <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <div className="m-4 p-6 leading-8 flex-col font-medium text-gray-900">

                        Want to add something new? Or Share some new Ideas?

                <div>
                            Mail here:

<a href="mailto:arkaraj2017@gmail.com" className="text-blue-500 hover:underline break-words">arkaraj2017@gmail.com</a>
                        </div>
                        Get in Touch:
                        <hr />
                        <div className="flex flex-row justify-evenly mt-4">

                            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-black">
                                <a href="https://github.com/Arkaraj/Brando" target="_blank"><FaGithub /></a>
                            </div>
                            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                <a href="https://twitter.com/Arkaraj3" target="_blank"><FaTwitter /></a>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Contact;
