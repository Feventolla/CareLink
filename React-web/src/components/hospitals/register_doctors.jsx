import React from 'react'

function AddDoctors() {
  return (
    <div>
        <form action="">
            <label htmlFor="fname">First Name</label>
            <input type="text" required placeholder="John" />
            <br />

            <label htmlFor="lname">Last Name</label>
            <input type="text" required placeholder="Doe" />
            <br />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
                type="tel"
                required
                placeholder="251 967 765 789"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}"
            />
            <br />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                required
                placeholder="johndoe45@gmail,com"
            />
            <br />

            <label htmlFor="specialization">Specialization</label>
            <input type="text" required placeholder="surgeon" />
            <br />

            <label htmlFor="yearsOfExperience">Years of Experience</label>
            <input type="number" required placeholder="3" />
            <br />

            <div>
                <label htmlFor="gender">Gender</label>
                <select name="geneder-select" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div>
            <label htmlFor="startTime">Start Time</label>
            <input type="time" required/>
            <label htmlFor="endTime">End Time</label>
            <input type="time" required/>
            </div>
            
            <label htmlFor="photo">Photo</label>
            <input type="file" />
            <br />
        </form>
    </div>
  )
}
export default AddDoctors;