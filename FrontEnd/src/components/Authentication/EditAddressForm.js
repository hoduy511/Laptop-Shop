import React, { useEffect, useState } from 'react';

const EditAddressForm = ({ address, onSave, onCancel }) => {
const [editedAddress, setEditedAddress] = useState({
    ...address,
});

const handleChange = (field, value) => {
    setEditedAddress({ ...editedAddress, [field]: value });
};

useEffect(() => {
    onSave(editedAddress);
}, [editedAddress, onSave]);

return (
    <div className='edit-container'>
        <div className='item'>
            <div className='item1'>
            <label>Address Type:</label>
            <select name="address type" onChange={(e) => handleChange('address_type', e.target.value)} id="address type">
                <option value="P">billing</option>
                <option value="S">shipping</option>
            </select>
            </div>
            <div className='item2'>
            <label>Default:</label>
            <input type='checkbox' defaultChecked={false} onChange={(e) => handleChange('default', e.target.value)}/>
            </div>
        </div>
        <div className='item'>
            <label>Apartment Address:</label>
            <input
                type="text"
                defaultValue={editedAddress.apartment_address}
                onChange={(e) => handleChange('apartment_address', e.target.value)}
            />
        </div>
        <div className='item'>
            <label>Street Address:</label>
            <input
                type="text"
                defaultValue={editedAddress.street_address}
                onChange={(e) => handleChange('street_address', e.target.value)}
            />
        </div>
        <div className='item'>
            <label>City:</label>
            <input
                type="text"
                defaultValue={editedAddress.city}
                onChange={(e) => handleChange('city', e.target.value)}
            />
            <label className="mx-2">Country:</label>
            <select name="country" onChange={(e) => handleChange('country', e.target.value)} id="country">
                <option value="VN">Viet Nam</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
            </select>
        </div>
        <div className='item'>
            <label>Postal Code:</label>
            <input
                type="text"
                defaultValue={editedAddress.postal_code}
                onChange={(e) => handleChange('postal_code', e.target.value)}
            />
            
        </div>
    </div>
);
};

export default EditAddressForm;
