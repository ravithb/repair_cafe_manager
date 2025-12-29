'use client'

import { useState, useRef, useContext, useEffect, forwardRef, useImperativeHandle } from "react";
import { createRepairItem, updateRepairItem } from "@/actions/repairItems";
import CustomerSearchTypeahead from "./CustomerSearchTypeahead";
import { GlobalStateContext } from "@/app/components/GlobalStateContextProvider";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AlertCircle, X } from "lucide-react";
import dayjs from "dayjs";


const ItemModal = forwardRef(({ categories, repairers, locations, onSave, onCancel }: 
    { categories: any[], repairers: any[], locations: any[], onSave? : Function, onCancel? : Function }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCustomerExpanded, setIsCustomerExpanded] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<any>();
  const { selectedDate, setSelectedDate, selectedLocation, setSelectedLocation } = useContext(GlobalStateContext)

  // form fields
  const [repairItemId, setRepairItemId] = useState<string>("");
  const [repairSessionId, setRepairSessionId] = useState<string>("");
  const [item, setItem] = useState("");
  const [fault, setFault] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [weight, setWeight] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [sessionDate, setSessionDate] = useState<any>("");
  const [locationId, setLocationId] = useState("");
  const [repairStatus, setRepairStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [primaryRepairerId, setPrimaryRepairerId] = useState("");
  const [secondaryRepairerId, setSecondaryRepairerId] = useState("");

  const [customerId, setCustomerId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");


  function setCurrentItem(repairSessionItem: any) {
    if(!repairSessionItem || !repairSessionItem.repairItem){
      return;
    }
    const repairItem = repairSessionItem?.repairItem;
    setRepairItemId(repairSessionItem?.repair_item_id);
    setRepairSessionId(repairSessionItem?.repair_session_id);
    setItem(repairItem?.item);
    setFault(repairItem?.fault);
    setCategoryId(repairItem?.category_id);
    setWeight(repairItem?.weight);
    setMake(repairItem?.make);
    setModel(repairItem?.model);
    setNotes(repairSessionItem?.notes);
    setRepairStatus(repairItem?.repair_status);
    setSessionDate(dayjs(repairSessionItem?.repairSession?.session_date));
    setLocationId(repairSessionItem?.repairSession?.location_id || "");
    setPrimaryRepairerId(repairSessionItem?.primary_repairer_id);
    setSecondaryRepairerId(repairSessionItem?.secondary_repairer_id);
    setSelectedCustomer(repairSessionItem?.repairSession?.customer)
  }

  function resetFields(){
    setRepairItemId("");
    setRepairSessionId("");
    setItem("");
    setFault("");
    setCategoryId("");
    setWeight("");
    setMake("");
    setModel("");
    setNotes("");
    setRepairStatus("");
    setSessionDate(selectedDate);
    setLocationId(selectedLocation?.id);
    setPrimaryRepairerId("");
    setSecondaryRepairerId("");
    setSelectedCustomer(null);

    setCustomerId("");
    setTitle("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
  }

  function closeModal(){
    resetFields();
    formRef.current?.reset();
    setIsOpen(false);
  }

  useEffect(()=>{
    if(selectedLocation){
      setLocationId(selectedLocation.id);
    }
  }, [selectedLocation]);

  useEffect(()=>{
    if(selectedDate){
      setSessionDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(()=>{
    if(!selectedCustomer || !selectedCustomer.id){
      return;
    }

    setCustomerId(selectedCustomer.id);
    setTitle(selectedCustomer.title);
    setFirstName(selectedCustomer.firstname);
    setLastName(selectedCustomer.lastname);
    setPhone(selectedCustomer.phone);
    setEmail(selectedCustomer.email);
  }, [selectedCustomer]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const formDataEntries = formData.entries();
    let result = null;
    console.log('repair item id', typeof repairItemId)
    if(!repairItemId || (repairItemId + "").trim().length==0){
      result = await createRepairItem(formData);
    }else{
      result = await updateRepairItem(formData);
    }

    if(result.success){
      closeModal();
      if(onSave){
        onSave();
      }
    }else{
      setError(result.error || "Unknown error occured");
    }
    
  };

  useImperativeHandle(ref, () => ({
    // Define the function the parent can call
    open(editItem: any) {
      setIsOpen(true);
      if(editItem){
        setCurrentItem(editItem);
      }else{
        setSessionDate(selectedDate);
        setLocationId(selectedLocation?.id);
      }

    }
  }));

  return ( isOpen ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 w-full">
      
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-3 border-b flex">
          <h2 className="text-xl font-semibold">Log New Repair Item</h2>
          <button 
                type="button"
                onClick={() => closeModal()}
                className="p-0! bg-gray-200 ml-auto border border-gray-400 rounded"
              >
                <X />
              </button>
        </div>
        {(error && <div 
          role="alert" 
          className="flex p-2 mx-2 text-sm text-red-800 "
        >
          <AlertCircle className="flex-shrink-0 inline w-5 h-5 me-3" />
          <div>
            <span className="font-bold">Something went wrong:</span> {error}
          </div>
        </div>)}
        <div className="flex-1 overflow-y-auto px-8 custom-scrollbar">
          <form action={handleSubmit} ref={formRef} className="p-6 space-y-4">
            <input type="hidden" value={repairItemId} name="repairItemId" readOnly />
            <input type="hidden" value={repairSessionId} name="repairSessionId" readOnly />
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Item Name</label>
                <input name="item" required className="w-full border p-2 rounded" placeholder="e.g. Blender" value={item} onChange={(e)=>setItem(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                   <TextField slotProps={{
                      input: { sx: { fontSize: '12px' } }, // Font size of the input text
                      inputLabel: { sx: { fontSize: '12px', fontWeight: 'bold', color:'#666666' }}  // Font size of the label
                    }} label="Fault Description" name="fault" multiline rows={3} fullWidth required value={fault} onChange={(e)=>setFault(e.target.value)} />
              </div>
              <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select name="categoryId" className="w-full border p-2 rounded" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)} >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.category}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                  <input name="weight" type="number" step="0.01" className="w-full border p-2 rounded" value={weight} onChange={(e)=>setWeight(e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Make</label>
                  <input name="make" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="e.g. Phillips" value={make} onChange={(e)=>setMake(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Model</label>
                  <input name="model" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. HR3041/00" value={model} onChange={(e)=>setModel(e.target.value)}  />
                </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="font-bold text-sm text-gray-700 uppercase tracking-wide">Customer Details</span>
              <span className="w-100"><CustomerSearchTypeahead onSelect={setSelectedCustomer} label="" placeholder="Search Customer"></CustomerSearchTypeahead>    </span>
              <button 
                type="button"
                onClick={() => setIsCustomerExpanded(!isCustomerExpanded)}
                className="px-4 py-2 bg-gray-200 border-gray-300 border rounded"
              >
                <span className="text-gray-500">{isCustomerExpanded ? '−' : '+'}</span>
              </button>
              </div>
              
              {isCustomerExpanded && (
                <div className="p-4 grid grid-cols-3 gap-3 bg-white border-t">
                  <input type="hidden" name="customerId" value={customerId || ""} />
                  <div className="col-span-1">
                    <label className="block text-xs font-semibold mb-1">Title</label>
                    <select name="customerTitle" className="w-full border p-2 rounded text-sm" value={title} onChange={(e)=>{setTitle(e.target.value)}}>
                      <option>Mr</option><option>Mrs</option><option>Ms</option><option>Dr</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">First Name</label>
                    <input name="customerFirstName" className="w-full border p-2 rounded text-sm required" placeholder="John" value={firstName || ""} onChange={(e)=>{setFirstName(e.target.value)}} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Last Name</label>
                    <input name="customerLastName" className="w-full border p-2 rounded text-sm required" placeholder="Doe" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Phone/Mobile Number</label>
                    <input name="customerPhone" type="phone" className="w-full border p-2 rounded text-sm required" placeholder="04xxxxxxxx" value={phone} onChange={(e)=>{setPhone(e.target.value)}} /> 
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold mb-1">Email</label>
                    <input name="customerEmail" type="email" className="w-full border p-2 rounded text-sm" placeholder="john@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Repair Attempt</h3>
              <div className="flex gap-4 text-xs text-gray-500 pb-2 border-b border-blue-100">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold mb-1">Date:</label>  
                  <DatePicker name="sessionDate" className="p-2" value={sessionDate} onChange={(newDate) => {
                    if(!repairItemId || repairItemId.trim().length==0){
                      setSelectedDate(newDate);
                    }
                    setSessionDate(newDate)
                  }} 
                    slotProps={{
                      textField: {
                        hiddenLabel: true,
                        size: 'small', // don't need this anymore so feel free to remove
                        sx: {
                          '> .MuiOutlinedInput-root': {
                            height: 18 // whatever height you want here
                          },
                           '& .MuiPickersSectionList-root': {
                              padding: '6px 0px',
                              fontSize: '12px'
                            },
                            '& .MuiPickersInputBase-root ' : {
                              border: '1px solid #666666'
                            }
                        }
                      }
                    }} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold mb-1">Location:</label>  
                  <select name="locationId" className="p-2 border rounded ml-1" value={locationId}
                      onChange={(e) => {
                        if(!repairItemId || repairItemId.trim().length==0){
                          setSelectedLocation(JSON.parse(e.target.options[e.target.selectedIndex]?.getAttribute('data-obj')+""));
                        }
                        setLocationId(e.target.value);
                      }}>
                    <option value="">Location</option>
                    {locations.map((loc) => (
                      <option key={loc.id} data-obj={JSON.stringify(loc)} value={loc.id}>
                        {loc.location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Repair Status</label>
                  <select name="status" className="w-full border p-2 rounded bg-white text-sm" value={repairStatus} onChange={
                    (e:any)=>{setRepairStatus(e.target.value);}
                  }>
                    <option>Pending</option>
                    <option>Fixed</option>
                    <option>Cannot Be Repaired</option>
                    <option>Waiting for Parts</option>
                    <option>Deffered To Another Session</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Notes</label>
                  <textarea name="notes" className="w-full border p-2 rounded bg-white text-sm" rows={2} 
                    placeholder="Repair notes..." value={notes} onChange={(e:any)=>{
                      setNotes(e.target.value);
                    }}></textarea>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Repairer</label>
                <select name="primaryRepairerId" className="w-full border p-2 rounded-md bg-white text-sm" value={primaryRepairerId} onChange={(e)=>{setPrimaryRepairerId(e.target.value)}}>
                  <option value="">None (Optional)</option>
                  {repairers.map(u => <option key={u.id} value={u.id}>{u.firstname} {u.lastname}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Secondary Repairer</label>
                <select name="secondaryRepairerId" className="w-full border p-2 rounded-md bg-white text-sm" value={secondaryRepairerId} onChange={(e)=>{setSecondaryRepairerId(e.target.value)}}>
                  <option value="">None (Optional)</option>
                  {repairers.map(u => <option key={u.id} value={u.id}>{u.firstname} {u.lastname}</option>)}
                </select>
              </div>
            </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => {
                  closeModal();
                  if(onCancel) {
                    onCancel();
                  }
                }} className="px-4 py-2 text-gray-600">Cancel</button>
              {/*<button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Add More Items...
              </button>*/}
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div> ) : (<></>)
  );
});

export default ItemModal;