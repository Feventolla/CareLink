import { useState } from "react";
import image1 from "../../../assets/hero-hosp.png";
import edit from "../../../assets/edit.svg";
import { RxDashboard, RxExit } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useGetHospitalsQuery } from "../../../store/hospital/hispital";

const Admindashboard = () => {
  const { data: hospitals, error, isLoading } = useGetHospitalsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  console.log(hospitals);
  const hospitalData = hospitals.value;
  const hospitalDatas = [
    {
      id: 1,
      title: "Card 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 6",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 7",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 8",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 9",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 10",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 11",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 12",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 13",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 14",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatibus, tenetur voluptate quasi eius animi. Libero illo ",
      imageUrl: { image1 },
    },
  ];
  const filteredhospitalData = hospitalData.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDetailHospital = (id) => {
    console.log(` card with id ${id} clicked`);
    navigate("/detailHospital");
  };
  const handleAddHospital = () => {
    navigate("/addHospital");
  };
  const handleDelete = (id) => {
    console.log(`Delete card with id ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit card with id ${id}`);
    navigate("/editHospital");
  };
  const handleLogout = () => {
    console.log("logout");
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currenthospitalData = filteredhospitalData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredhospitalData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className="bg-white text-black min-h-screen max-w-full">
      <div className="p-5">
        <div className="flex flex-row ">
          <div className="text-4xl font-bold pt-5">
            <span className="text-[#C276F0]">Care</span>Link
          </div>
          <div className="flex bg-[#FAFAFA] items-center justify-center w-full text-3xl text-[#3E435D] font-semibold pt-10 pb-10 ml-6 ">
            Welcome, Dagim
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-16 ">
          <div className="flex flex-row gap-3">
            <RxDashboard className="text-[#C276F0] mt-1" />
            <div className="flex font-semibold text-[#C276F0]">Dashboard</div>
          </div>

          <div className="flex flex-col w-full bg-[#FAFAFA] pl-3">
            <div className="text-xl font-semibold pb-4 md:pb-7">
              Hospitals Information
            </div>
            <div className="flex flex-col md:flex-row justify-between md:space-x-4 mb-5">
              <div className="mb-4 md:mb-0">
                <button
                  className="bg-[#C276F0] text-white font-bold py-2 px-10 rounded"
                  onClick={handleAddHospital}
                >
                  Add Hospital
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 w-full md:w-96 mb-4 md:mb-0 border rounded"
                />
              </div>
            </div>

            {currenthospitalData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shadow-sm relative">
                {currenthospitalData.map((card) => (
                  <div
                    key={card._id}
                    className="bg-white p-4 border rounded-2xl shadow"
                  >
                    <div className="flex flex-row items-center space-x-3">
                      <div className="">
                        <img
                          src={card.photo}
                          alt="Card"
                          className="w-14 h-9 rounded-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold">{card.name}</h3>
                      </div>
                      <div
                        onClick={() => handleEdit(card._id)}
                        className="flex items-end cursor-pointer"
                      >
                        <img
                          src={edit}
                          alt="Edit"
                          className=""
                          // Add any styles you need for the edit icon
                        />
                      </div>
                    </div>
                    <div className="card-content">
                      <p
                        className="py-5 cursor-pointer"
                        onClick={handleDetailHospital}
                      >
                        {card.description}
                      </p>
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="text-red-300 text-md cursor-pointer"
                      >
                        Delete Hospital
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex text-3xl justify-center mt-4 text-red-700 ">
                Oops, No Hospital Found
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row  mt-4">
          <div
            className="flex flex-row gap-2 cursor-pointer"
            onClick={() => handleLogout()}
          >
            <RxExit />
            <div>Logout</div>
          </div>
          <div className="mt-4 md:mt-0 ml-2 md:ml-24">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-2 px-4 py-2 ${
                    currentPage === page
                      ? "bg-[#C276F0] text-white"
                      : "bg-gray-200"
                  } rounded-lg`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admindashboard;
