import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import { toast } from "react-toastify";

function Reservation() {
  const {register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const BACKEND_URI="https://sushi-restaurant-m6oe.onrender.com";
  
  const onSubmit = async(data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URI}/api/reservation`, {
        ...data, // we used spread operator, instead of fullname: data.fullname...
        comments: data.comments || "",
        newsletter: !!data.newsletter,
        status: "pending"
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      toast.success(res.data.message);
      reset();
      navigate("/reservation-success", { state: { reservation: res.data.reservation } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!")
    } finally {
      setLoading(false);
    }
  }

  const onError = (errors) => {
    toast.error("Please fill all input fields!")
  }

  return (
    <>
      <section className="flex justify-center items-center min-h-screen py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto relative">

          <Link to="/">
            <span className="my-4 text-lightGray font-cinzel hover:underline flex items-center justify-start gap-2 hover:text-goldYellow transition-colors duration-300
              ">
              <FaArrowLeft className="w-3" />
              Back
            </span>
          </Link>

          <div className="grid lg:grid-cols-2 items-center gap-10">
            <div className="space-y-10 xl:space-y-16">

              <h2 className="text-lightGray font-medium text-2xl lg:text-3xl xl:text-[2.5rem] text-left">
                Reservation
              </h2>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="flex items-center justify-center gap-2">
                  <div className="space-y-2 w-full sm:w-1/2">
                    <label htmlFor="fullname" className="text-lightGray text-sm lg:text-base">Full Name</label>
                    <div className="">
                      <input 
                        autoFocus={true}
                        type="text" 
                        id="fullname"
                        className={`input ${errors.fullname ? '!border-red' : ''}`}
                        {...register('fullname', {
                          required: "Please enter your name!"
                        })}
                      />
                    </div>
                    {errors.fullname && (
                      <p className="error">{errors.fullname.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 w-full sm:w-1/2">
                    <label htmlFor="email" className="text-lightGray text-sm lg:text-base">Email</label>
                      <div className="">
                        <input
                          type="email" 
                          id="email"
                          className={`input ${errors.email ? '!border-red' : ''}`}
                          {...register('email', {
                            required: "Please enter your email!",
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Please enter a valid email!"
                            }
                          })}
                        />
                      </div>
                    {errors.email && (
                      <p className="error">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <div className="space-y-2 w-full">
                    <label htmlFor="phone" className="text-lightGray text-sm lg:text-base">Phone</label>
                    <div className="">
                      <input 
                        type="tel"
                        id="phone"
                        placeholder="+93123456789"
                        className={`input ${errors.phone ? '!border-red' : ''}`}
                        {...register('phone', {
                          required: "Please enter your phone number!",
                          pattern: {
                            value: /^\+?\d{9,15}$/,
                            message: "Invalid phone number format!",
                          },
                        })}
                      />
                    </div>
                    {errors.phone && (
                      <p className="error">{errors.phone.message}</p>
                    )}
                  </div> 

                  <div className="space-y-2 w-full">
                    <label htmlFor="people" className="text-lightGray text-sm lg:text-base">People</label>
                    <div className="">
                      <input 
                        type="number" 
                        id="people"
                        placeholder="4 people"
                        className={`input ${errors.people ? '!border-red' : ''}`}
                        {...register('people', {
                          required: "Please enter number of people!",
                          min: {value: 1, message: "At least 1 person required!"},
                          max: {value: 60, message: "Maximum 60 people allowed!"},
                        })}
                      />
                    </div>
                    {errors.people && (
                      <p className="error">{errors.people.message}</p>
                    )}
                  </div> 
                </div>

                <div className="space-y-2 w-full">
                  <label htmlFor="table" className="text-lightGray text-sm lg:text-base">Table</label>
                  <div className="">
                    <select
                      name="table" 
                      id="table" 
                      className={`input cursor-pointer ${errors.table ? '!border-red' : ''}`}
                      {...register('table', {
                        required: "Please select one of tables!",
                      })}
                    >
                      <option value="">Select a table</option>
                      <option value="Fine | $500">Fine Dining | $500</option>
                      <option value="Gold | $1000">Gold Dining | $1000</option>
                      <option value="Royalty | $1500">Royalty Dining | $1500</option>
                    </select>
                  </div>
                  {errors.table && (
                    <p className="error">{errors.table.message}</p>
                  )}
                </div> 

                <div className="flex items-center justify-center gap-2">
                  <div className="space-y-2 w-full sm:w-1/2">
                    <label htmlFor="date" className="text-lightGray text-sm lg:text-base">Date</label>
                    <div className="">
                      <input
                        type="date" 
                        id="date"
                        className={`input ${errors.date ? '!border-red' : ''}`}
                        {...register('date', {
                          required: "Please enter a date!"
                        })}
                      />
                    </div>
                    {errors.date && (
                      <p className="error">{errors.date.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 w-full sm:w-1/2">
                    <label htmlFor="time" className="text-lightGray text-sm lg:text-base">Time</label>
                    <div className="">
                      <input 
                        type="time"
                        id="time"
                        className={`input accent-goldYellow ${errors.time ? '!border-red' : ''}`}
                        {...register('time', {
                          required: "Please enter the time!"
                        })}
                      />
                    </div>
                    {errors.time && (
                      <p className="error">{errors.time.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 w-full">
                  <label htmlFor="comments" className="text-lightGray text-sm lg:text-base">Comments (optional)</label>
                  <textarea 
                    id="comments"
                    name="comments"
                    className="input"
                    {...register("comments")}
                  >
                  </textarea>
                </div>

                <div className="">
                  <label className="flex items-center gap-2 md:py-3">
                    <input 
                      type="checkbox" 
                      name="newsletter"
                      className="scale-100 cursor-pointer accent-goldYellow"
                      {...register("newsletter")}
                    />
                    <div className="text-lightGray text-sm">
                      Subscribe to the newsletter
                    </div> 
                  </label>
                </div>

                <div className="">
                  <button 
                    type="submit"
                    disabled={loading}
                    className={`bg-goldYellow shadow-[0_0_0.2rem] shadow-goldYellow text-darkCharcoal font-cormorantSC font-semibold w-full max-w-36 lg:max-w-52 md:text-lg
                    lg:text-xl py-1 hover:bg-softBeigeYellow hover:shadow-softBeigeYellow transition-colors duration-300 rounded-md
                    ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
                  >
                    {loading ? 'Booking...' : 'Book table'}
                  </button>
                </div>
              </form>
            </div>

            <div className="">
              <img 
                src="images/shrimp-sushi.jpg"
                alt="shrimp-sushi"
                className="flex rounded-2xl w-[28.125rem] sm:w-[33.125rem] md:w-[34.375rem] h-52 lg:h-full lg:max-w-md xl:max-w-xl object-cover" 
              />
            </div>
            
          </div>
        </div>
      </section>
    </>
  )
}

export default Reservation;