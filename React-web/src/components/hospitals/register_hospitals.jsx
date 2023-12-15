import React from 'react'

function RegisterHospitals() {
    const options = [
        {value: "Monday", label:"Monday"},
        {value: "Tuesday", label:"Tuesday"},
        {value: "Wednesday", label:"Wednesday"},
        {value: "Thursday", label:"Thursday"},
        {value: "Friday", label:"Friday"},
        {value: "Saturday", label:"Saturday"},
        {value: "Sunday", label:"Sunday"}
    ]
  return (
    <div>
    <form action="">
        <label htmlFor="hospital name">Hospital Name</label>
        <input type="text" required placeholder="Tkur Anbesa" />
        <br />

        <label htmlFor="secialization">Specialization</label>
        <input
            type="text"
            required
            placeholder="General Hospital"
        />
        <br />

        <label htmlFor="Description">About Hospital</label>
        <input
            type="text"
            required
            placeholder="write here about the hospital"
        />
        <br />
        <div>
            <label htmlFor="availability">Availability</label>
            <div>
                <label htmlFor="opening">Opening Time</label>
                <input
                    type="time"
                    required
                    placeholder="08:00 AM"
                />
                <br />
            </div>
            <div>
                <label htmlFor="closing">Closing Time</label>
                <input
                    type="time"
                    required
                    placeholder="6:00 PM "
                />
                <br />
            </div>
        </div>
        <label htmlFor="website">Website</label>
        <input type="url" placeholder="www.tkuranbesa.com" />
        <br />

        <label htmlFor="contact">Contact</label>
        <input
            type="tel"
            required
            placeholder="+251 967 765 789"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}"
        />
        <br />
        <label htmlFor="services">Services</label>
        <input type="text" required placeholder="CTScan, MRI" />
        <br />
        <div>
               <Select option={options}>Working days</Select>
            </div>

        <label htmlFor="operational hours">Operational Hours</label>
        <input type="number" required placeholder="8" />
        <br />
        
        <label htmlFor="photo">Photo</label>
        <input type="file" />
        <br />
        <button type='submit'>Add Hospital</button>
    </form>
</div>
  )
}

export default RegisterHospitals