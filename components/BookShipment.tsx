import React, { useState } from 'react';
import { User, Page } from '../App';
import { api } from '../api';
import { SpinnerIcon, ChevronDownIcon, ChevronUpIcon } from './IconComponents';

interface BookShipmentProps {
  user: User;
  onNavigate: (page: Page, data?: any) => void;
}

const FormSection: React.FC<{ title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, isOpen, onToggle, children }) => (
    <div className="border border-gray-300 rounded-md mb-4 bg-white">
        <button type="button" onClick={onToggle} className="w-full flex justify-between items-center p-3 bg-slate-700 text-white rounded-t-md font-semibold focus:outline-none">
            <span>{title}</span>
            {isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
        </button>
        {isOpen && <div className="p-4 border-t border-gray-300">{children}</div>}
    </div>
);

const InputField = ({ label, id, required, className, error, ...props }: {label?: string, id: string, required?: boolean, className?: string, error?: string, [key: string]: any}) => (
    <div className={className}>
        {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>}
        <input id={id} name={id} required={required} {...props} className={`block w-full px-2 py-1.5 border rounded-md shadow-sm focus:outline-none sm:text-sm placeholder-gray-400 ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`} />
        {error && <p className="mt-1 text-xs text-red-600" id={`${id}-error`}>{error}</p>}
    </div>
);


const SelectField = ({ label, id, required, children, className, ...props }: {label: string, id: string, required?: boolean, children: React.ReactNode, className?: string, [key: string]: any}) => (
     <div className={className}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <select id={id} name={id} required={required} {...props} className="block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            {children}
        </select>
    </div>
);


const BookShipment: React.FC<BookShipmentProps> = ({ user, onNavigate }) => {
    const [bookingDate] = useState(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'));
    const [sectionsOpen, setSectionsOpen] = useState({
        consignor: true, consignee: true, packet: true, weight: true, remarks: true, upload: true
    });
    const [awbNo, setAwbNo] = useState('');
    const [awbError, setAwbError] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      // Client-side validation for AWB No
      const awbRegex = /^[a-zA-Z0-9]+$/;
      if (!awbNo.trim()) {
          setAwbError('AWB No is required.');
          return;
      }
      if (!awbRegex.test(awbNo)) {
          setAwbError('AWB No must be alphanumeric.');
          return;
      }

      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      console.log('Submitting Form Data:', data);
      setTimeout(() => {
        setIsLoading(false);
        alert('International shipment booked successfully (simulated)!');
        onNavigate('dashboard');
      }, 2000);
    }
    
    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        const form = e.currentTarget.form;
        if (form) {
            form.reset();
            setAwbNo('');
            setAwbError('');
        }
    }
    
    const handleAwbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAwbNo(e.target.value);
        if (awbError) {
            setAwbError('');
        }
    };

    return (
        <main className="min-h-[calc(100vh-128px)] bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <form onSubmit={handleSubmit} noValidate>
                    {/* Top Section */}
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200">
                        <div className="flex flex-wrap items-end gap-x-4 gap-y-4">
                            <div className="flex items-center space-x-4 flex-shrink-0">
                                 <label className="flex items-center whitespace-nowrap">
                                    <input type="radio" name="bookingType" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                    <span className="ml-2 text-sm font-medium text-gray-700">International Booking</span>
                                </label>
                                <label className="flex items-center whitespace-nowrap">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="ml-2 text-sm font-medium text-gray-700">Update</span>
                                </label>
                                <label className="flex items-center whitespace-nowrap">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="ml-2 text-sm font-medium text-gray-700">IsScan</span>
                                </label>
                            </div>
                            
                            <InputField label="Forwarding No." id="forwardingNo" placeholder="Forwarding No." className="flex-1 min-w-[150px]"/>
                            <InputField 
                                label="AWB No" 
                                id="awbNo" 
                                placeholder="Enter AWB No" 
                                required 
                                className="flex-1 min-w-[150px]"
                                value={awbNo}
                                onChange={handleAwbChange}
                                error={awbError}
                                aria-invalid={!!awbError}
                                aria-describedby="awbNo-error"
                            />
                            <InputField label="Ref No" id="refNo" placeholder="Enter Ref No" className="flex-1 min-w-[150px]"/>
                            <InputField label="Booking Date" id="bookingDate" value={bookingDate} readOnly className="flex-1 min-w-[150px]"/>
                        </div>

                        <div className="mt-4">
                            <InputField label="Client" id="client" placeholder="Enter Client" required className="max-w-md"/>
                        </div>
                    </div>
                    
                    <FormSection title="Consignor Details" isOpen={sectionsOpen.consignor} onToggle={() => setSectionsOpen(s => ({...s, consignor: !s.consignor}))}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        <div>
                            <div className="flex items-end gap-4">
                               <InputField label="Consignor" id="consignorName" required placeholder="Enter Consignor" className="flex-grow"/>
                               <label className="flex items-center mb-1.5"><input type="checkbox" className="h-4 w-4"/> <span className="ml-2">Fix</span></label>
                            </div>
                            <InputField label="Address2" id="consignorAddress2" required placeholder="Enter Address2" className="mt-4"/>
                            <InputField label="Country" id="consignorCountry" required placeholder="Enter Country" className="mt-4"/>
                            <InputField label="Mobile No" id="consignorMobileNo" required placeholder="Enter Mobile No" className="mt-4"/>
                            <InputField label="Alt Mob No" id="consignorAltMobNo" placeholder="Enter Alternate Mobile No" className="mt-4"/>
                            <InputField label="AadhaarNo" id="consignorAadhaarNo" placeholder="Enter AadhaarNo" className="mt-4"/>
                            <InputField label="Bank IFSC" id="consignorBankIfsc" placeholder="Bank IFSC" className="mt-4"/>
                        </div>
                        <div>
                            <InputField label="CPerson" id="consignorCPerson" placeholder="Enter Contact Person"/>
                            <InputField label="Address3" id="consignorAddress3" placeholder="Enter Address3" className="mt-4"/>
                            <InputField label="State" id="consignorState" placeholder="Enter State" className="mt-4"/>
                            <InputField label="Email ID" id="consignorEmailID" required placeholder="Enter Consignor Email" className="mt-4"/>
                            <InputField label="GSTIN" id="consignorGstin" placeholder="Enter GSTIN" className="mt-4"/>
                            <InputField label="Bank AD Code" id="consignorBankAdCode" placeholder="Bank AD Code" className="mt-4"/>
                        </div>
                        <div>
                            <InputField label="Address1" id="consignorAddress1" required placeholder="Enter Address1"/>
                            <InputField label="Pin Code" id="consignorPinCode" required placeholder="Enter Pin Code" className="mt-4"/>
                            <InputField label="City" id="consignorCity" required placeholder="Enter City" className="mt-4"/>
                            <InputField label="PAN" id="consignorPan" placeholder="Enter PAN" className="mt-4"/>
                            <InputField label="IEC" id="consignorIec" placeholder="Enter IEC" className="mt-4"/>
                            <InputField label="Bank AC" id="consignorBankAc" placeholder="Bank AC" className="mt-4"/>
                        </div>
                      </div>
                    </FormSection>

                    <FormSection title="Consignee Details" isOpen={sectionsOpen.consignee} onToggle={() => setSectionsOpen(s => ({...s, consignee: !s.consignee}))}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            <div>
                                <InputField label="Consignee" id="consigneeName" required placeholder="Enter Consignee"/>
                                <InputField label="Address2" id="consigneeAddress2" required placeholder="Enter Address2" className="mt-4"/>
                                <InputField label="Country" id="consigneeCountry" required placeholder="Enter Country" className="mt-4"/>
                                <InputField label="Mobile No" id="consigneeMobileNo" required placeholder="Enter Mobile No" className="mt-4"/>
                                <InputField label="Alt Mob No" id="consigneeAltMobNo" placeholder="Enter Alternate Mobile No" className="mt-4"/>
                                <InputField label="AadhaarNo" id="consigneeAadhaarNo" placeholder="Enter AadhaarNo" className="mt-4"/>
                            </div>
                            <div>
                                <InputField label="CPerson" id="consigneeCPerson" placeholder="Enter Contact Person"/>
                                <InputField label="Address3" id="consigneeAddress3" placeholder="Enter Address3" className="mt-4"/>
                                <InputField label="State" id="consigneeState" placeholder="Enter State" className="mt-4"/>
                                <InputField label="Email ID" id="consigneeEmailID" placeholder="Enter EmailID" className="mt-4"/>
                                <InputField label="IEC" id="consigneeIec" placeholder="Enter IEC" className="mt-4"/>
                                <InputField label="IOSS NO." id="consigneeIossNo" placeholder="IOSS NO." className="mt-4"/>
                            </div>
                            <div>
                                <InputField label="Address1" id="consigneeAddress1" required placeholder="Enter Address1"/>
                                <InputField label="Pin Code" id="consigneePinCode" required placeholder="Enter Pin Code" className="mt-4"/>
                                <InputField label="City" id="consigneeCity" required placeholder="Enter City" className="mt-4"/>
                                <InputField label="GSTIN" id="consigneeGstin" placeholder="Enter GSTIN" className="mt-4"/>
                                <InputField label="PAN" id="consigneePan" placeholder="Enter PAN" className="mt-4"/>
                                <InputField label="IOSS Amount" id="consigneeIossAmount" placeholder="IOSS Amount" className="mt-4"/>
                            </div>
                        </div>
                    </FormSection>

                    <FormSection title="Packet Details" isOpen={sectionsOpen.packet} onToggle={() => setSectionsOpen(s => ({...s, packet: !s.packet}))}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <SelectField label="Packet Type" id="packetType" required><option>--Select Packet Type--</option></SelectField>
                           <SelectField label="Payment Type" id="paymentType" required><option>--Select Payment Type--</option></SelectField>
                           <InputField label="Invoice No" id="invoiceNo" placeholder="Enter Invoice No"/>
                           <InputField label="Packet Description" id="packetDescription" required placeholder="Packet Description"/>
                           <InputField label="Invoice Description" id="invoiceDescription" placeholder="Invoice Description" className="md:col-span-2"/>
                        </div>
                    </FormSection>
                    
                    <FormSection title="Weight Details" isOpen={sectionsOpen.weight} onToggle={() => setSectionsOpen(s => ({...s, weight: !s.weight}))}>
                      <div className="flex items-center gap-4 mb-4">
                          <label className="flex items-center"><input type="checkbox"/> <span className="ml-2">Vol Weight</span></label>
                          <label className="flex items-center"><input type="checkbox"/> <span className="ml-2">Identical</span></label>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                         <InputField label="PCS" id="pcs" required placeholder="Enter Pieces"/>
                         <InputField label="Actual Weight" id="actualWeight" required placeholder="Enter Actual Weight"/>
                         <div className="flex items-end space-x-1">
                           <InputField label="Vendor Weight" id="vendorWeight" required placeholder="Enter Vendor Weight" className="flex-grow"/>
                           <select className="block w-20 px-2 py-1.5 border border-gray-300 rounded-md shadow-sm sm:text-sm"><option>KGS</option></select>
                         </div>
                         <div className="flex items-end space-x-1">
                           <InputField label="Total Value" id="totalValue" required placeholder="Total Value" className="flex-grow"/>
                           <select className="block w-20 px-2 py-1.5 border border-gray-300 rounded-md shadow-sm sm:text-sm"><option>INR</option></select>
                         </div>
                         <SelectField label="Divisor" id="divisor" required><option>5000</option></SelectField>
                      </div>
                    </FormSection>
                    
                    <FormSection title="Remarks" isOpen={sectionsOpen.remarks} onToggle={() => setSectionsOpen(s => ({...s, remarks: !s.remarks}))}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <textarea placeholder="Enter Operation Remarks" rows={2} className="block w-full px-2 py-1.5 border border-gray-300 rounded-md"></textarea>
                        <textarea placeholder="Enter Accounting Remarks" rows={2} className="block w-full px-2 py-1.5 border border-gray-300 rounded-md"></textarea>
                      </div>
                    </FormSection>
                    
                    <FormSection title="Upload Invoice Document" isOpen={sectionsOpen.upload} onToggle={() => setSectionsOpen(s => ({...s, upload: !s.upload}))}>
                       <div className="flex items-center space-x-4">
                        <input type="file" id="invoiceFile" className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                        <div className="text-red-600 text-sm">
                            <p>1. File Format should be PDF</p>
                            <p>2. File Size should be less than 1024 KB.</p>
                        </div>
                       </div>
                    </FormSection>
                    
                    <div className="flex flex-wrap gap-2 justify-center items-center bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300">
                           {isLoading ? <SpinnerIcon className="animate-spin h-5 w-5"/> : 'Submit'}
                        </button>
                        <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700">Awb Print</button>
                        <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700">Forwarder Label Print</button>
                        <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700">Invoice Print</button>
                        <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700">Box Wise Invoice Print</button>
                        <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700">Label Print</button>
                        <button type="button" onClick={handleReset} className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-600">Reset</button>
                    </div>

                </form>
            </div>
        </main>
    );
};

export default BookShipment;