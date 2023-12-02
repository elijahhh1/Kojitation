import React, { FC, FormEventHandler, useEffect, ChangeEventHandler, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from '@inertiajs/react'
import { ArrowRightSquare, EyeIcon, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Spinner from '../Spinner'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'


const RegisterModal:FC<{isOpen:boolean,onClose:()=>void}> = ({isOpen,onClose}) => {

    const [isAgree, setIsAgree] = useState(false);

    const {data,setData,processing,errors,reset,post} = useForm({
        name:"",
        user_name:"",
        email:"",
        password:"",
        password_confirmation:""
    });

    useEffect(()=>{
        if (!isOpen) {
            reset();
            errors.name="";
            errors.user_name="";
            errors.email="";
            errors.password="";
            errors.password_confirmation="";
        };
    },[isOpen]);

    useEffect(()=>{
        console.log(isAgree);
    },[isAgree]);

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route('register'),{
            onSuccess:()=>{
                isOpen = false;
                toast.success('Registration successful');
                onClose();
            },
            onError:(e)=>console.log(e)
        });
    }

    const [openTerms, setOpenTerms] = useState(false)
    const [openUserPrivacy, setUserPrivacy] = useState(false)
    const [viewPassword, setViewPassword] = useState(false)

    const ViewPasswordComponent = () => {
        return(
            <i onClick={()=>setViewPassword((!viewPassword))} className='absolute bottom-2 right-2 cursor-pointer w-6 h-6'>
                <div className='relative'>
                    <EyeIcon className={cn('absolute', viewPassword===true?'':'hidden')} />
                    <EyeOff className={cn('absolute', viewPassword===false?'':'hidden')} />
                </div>
            </i>
        )
    }

    return (
        <>
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#DAEAFF] dark:text-gray-900">
                <DialogHeader>
                    <DialogTitle>SIGN UP</DialogTitle>
                    <DialogDescription className='dark:text-gray-700'>
                        Enter Login Credentials
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} id='auth' className="grid gap-4 py-4">
                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="name" className="text-right">
                            Fullname
                        </Label>
                        <Input required value={data.name} onChange={({target})=>setData('name',target.value)} disabled={processing} id="name"
                            className="col-span-3 dark:bg-[#bfdcff]" autoFocus autoComplete='off'/>
                    </div>
                    {errors.name && <p className='text-destructive text-xs text-right -mt-3'>{errors.name}</p>}

                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="user_name" className="text-right">
                            UserName
                        </Label>
                        <Input required value={data.user_name} onChange={({target})=>setData('user_name',target.value)} disabled={processing} id="user_name"
                            className="col-span-3 dark:bg-[#bfdcff]" autoComplete='off'/>
                    </div>
                    {errors.user_name && <p className='text-destructive text-xs text-right -mt-3'>{errors.user_name}</p>}

                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input required value={data.email} onChange={({target})=>setData('email',target.value)} disabled={processing} id="email"
                            className="col-span-3 dark:bg-[#bfdcff]" autoComplete='off'/>
                    </div>
                    {errors.email && <p className='text-destructive text-xs text-right -mt-3'>{errors.email}</p>}

                    <div className="relative flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input required type={viewPassword===true?'text':'password'} value={data.password} onChange={({target})=>setData('password',target.value)} disabled={processing} id="password"
                            className="col-span-3 dark:bg-[#bfdcff]" />
                        <ViewPasswordComponent/>
                    </div>
                    <div>
                        <p className='m-0 text-gray-600 text-xs'>Password should have at least 8 characters</p>
                        <p className='m-0 text-gray-600 text-xs'>Password should contain at least 1 special character</p>
                    </div>
                    {errors.password && <p className='text-destructive text-xs text-right -mt-3'>{errors.password}</p>}

                    <div className="flex flex-col items-start justify-center space-y-1.5">
                        <Label htmlFor="password_confirmation" className="text-right">
                            Confirm Password
                        </Label>
                        <Input required type='password' value={data.password_confirmation} onChange={({target})=>setData('password_confirmation',target.value)} disabled={processing} id="password_confirmation"
                            className="col-span-3 dark:bg-[#bfdcff]" />
                    </div>
                    {errors.password_confirmation && <p className='text-destructive text-xs text-right -mt-3'>{errors.password_confirmation}</p>}
                </form>

                <div className='flex items-center'>
                    <div className='flex items-center'>
                        <Checkbox id="agree" onCheckedChange={()=>setIsAgree(!isAgree)}
                            className='border-gray-700 mr-2' />

                        <Label>
                            <span>I agree to </span>
                            <a className='cursor-pointer text-blue-700 underline' onClick={()=>setOpenTerms(true)}>terms</a>
                            <span> and </span>
                            <a className='cursor-pointer text-blue-700 underline' onClick={()=>setUserPrivacy(true)}>user privacy</a>
                        </Label>
                    </div>

                    <Button variant='outline' disabled={(processing||isAgree==false)} size='sm' form='auth' type="submit"
                        className='bg-[#86bdff] hover:bg-[#bfdcff] dark:hover:text-gray-900 ml-auto'>
                        {processing ? <Spinner />: <ArrowRightSquare className='h-5 w-5' /> }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

        <TermsModal openTerms={openTerms} onClose={()=>setOpenTerms(false)}/>
        <UserPrivacyModal openUserPrivacy={openUserPrivacy} onClose={()=>setUserPrivacy(false)}/>
        </>
    )
}

export default RegisterModal;

const TermsModal:FC<{openTerms:boolean|undefined, onClose:()=>void}> = ({openTerms, onClose}) => {
    return (
        <Dialog open={openTerms} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className='font-bold text-lg'>Terms and Condition</h2>
                </DialogHeader>
                <div className='h-[25rem] text-sm overflow-auto'>
                    <h2 className='mx-1 my-4 font-bold text-md'>Welcome to Kojitation!</h2>
                    <p className='mx-1 my-4'>These terms and conditions outline the rules and regulations for the use of Kojitation's Website, located at www.kojitation.com.</p>
                    <p className='mx-1 my-4'>By accessing this website we assume you accept these terms and conditions. Do not continue to use Kojitation if you do not agree to take all of the terms and conditions stated on this page.</p>
                    <p className='mx-1 my-4'>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "User", "You" and "Your" refers to you, the person log on this website and compliant to the terms and conditions. "Kojitation", "Ourselves", "We", "Our" and "Us", refers to our Website. "Party", "Parties", or "Us", refers to both the User and ourselves. In accordance with and subject to, prevailing law of Cyber Security. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

                    <h2 className='mx-1 my-4 font-bold text-md'>Cookies</h2>
                    <p className='mx-1 my-4'>We employ the use of cookies. By accessing Kojitation, you agreed to use cookies in agreement with the Kojitation's Privacy Policy.</p>
                    <p className='mx-1 my-4'>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

                    <h2 className='mx-1 my-4 font-bold text-md'>License</h2>
                    <p className='mx-1 my-4'>Unless otherwise stated, Kojitation and/or its licensors own the intellectual property rights for all material on Kojitation. All intellectual property rights are reserved. You may access this from Kojitation for your own personal use subjected to restrictions set in these terms and conditions.</p>

                    <p>You must not:</p>
                    <ul className='list-disc list-inside'>
                        <li>Republish material from Kojitation</li>
                        <li>Sell, rent or sub-license material from Kojitation</li>
                        <li>Reproduce, duplicate or copy material from Kojitation</li>
                        <li>Redistribute content from Kojitation</li>
                    </ul>

                    <p className='mx-1 my-4'>This Agreement shall begin on the date hereof.</p>
                    <p className='mx-1 my-4'>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Kojitation does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Kojitation. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Kojitation shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
                    <p className='mx-1 my-4'>Kojitation reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>
                    <p>You warrant and represent that:</p>
                    <ul className='list-disc list-inside'>
                        <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                        <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                        <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                        <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                    </ul>
                    <p className='mx-1 my-4'>You hereby grant Kojitation a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>


                    <h2 className='mx-1 my-4 font-bold text-md'>Disclaimer</h2>
                    <p className='mx-1 my-4'>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
                        <li>limit or exclude our or your liability for death or personal injury;</li>
                        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                        <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                        <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                    <p className='mx-1 my-4'>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
                    <p className='mx-1 my-4'>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const UserPrivacyModal:FC<{openUserPrivacy:boolean|undefined, onClose:()=>void}> = ({openUserPrivacy, onClose}) => {
    return (
        <Dialog open={openUserPrivacy} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className='font-bold text-lg'>User Privacy Policy for Kojitation</h2>
                </DialogHeader>
                <div className='h-[25rem] text-sm overflow-auto'>
                    <h2 className='mx-1 my-4 font-bold text-md'>**Welcome to Kojitation!**</h2>
                    <p className='mx-1 my-4'>As a user, your privacy and security are our top priorities. This Privacy Policy is designed to inform you about how we collect, use, and protect your information during your initial account creation and login.</p>

                    <h2 className='mx-1 my-4 font-bold text-md'>**Information We Collect:**</h2>
                    <ul className='list-decimal list-inside'>
                        <li>**Account Creation:** When you create your account, we collect necessary information, including your name, email address, and a secure password.</li>
                        <li>**Profile Information:** You may choose to provide additional profile information, such as a profile picture or other details, to personalize your experience.</li>
                    </ul>

                    <h2 className='mx-1 my-4 font-bold text-md'>**How We Use Your Information:**</h2>
                    <ul className='list-decimal list-inside'>
                        <li>**Account Setup:** The collected information is used to create and manage your account on Kojitation.</li>
                        <li>**Communication:** We may use your email address to communicate important updates, account-related information, or security notifications.</li>
                    </ul>

                    <h2 className='mx-1 my-4 font-bold text-md'>**Security Measures:**</h2>
                    <p className='mx-1 my-4'>We employ industry-standard security measures to protect your information. This includes encryption, secure transmission protocols, and regular security audits. We strive to ensure the confidentiality and integrity of your data.</p>

                    <h2 className='mx-1 my-4 font-bold text-md'>**Third-Party Access:**</h2>
                    <p className='mx-1 my-4'>Your information is not sold or shared with third parties for marketing purposes. If you choose to log in using third-party authentication services, the information is used solely for authentication purposes.</p>

                    <h2 className='mx-1 my-4 font-bold text-md'>**Updates to Privacy Policy:**</h2>
                    <p className='mx-1 my-4'>This User Privacy Policy may be updated from time to time. Any changes will be posted on this page, and you will be notified of significant updates.</p>

                    <h2 className='mx-1 my-4 font-bold text-md'>**Contact Information:**</h2>
                    <p className='mx-1 my-4'>If you have questions or concerns about this User Privacy Policy, please contact us at [your contact information].</p>
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
