import { useState } from "react";
import image1 from "../assets/hero-hosp.png";
import edit from "../assets/edit.svg";
import { RxDashboard } from "react-icons/rx";

const Admindashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const data = [
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      imageUrl: { image1 },
    },
  ];
  const filteredData = data.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDelete = (id) => {
    // Implement delete logic here
    console.log(`Delete card with id ${id}`);
  };

  const handleEdit = (id) => {
    // Implement edit logic here
    console.log(`Edit card with id ${id}`);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <main className="bg-white text-black min-h-screen max-w-full">
      <div className="p-5">
        <div className="flex flex-row pt-10">
          <div className="text-4xl font-bold">
            <span className="text-[#C276F0]">Care</span>Link
          </div>
          <div className="flex items-center justify-center w-full text-3xl text-[#3E435D] font-semibold ">
            Welcome, Dagim
          </div>
        </div>

        <div className="flex flex-row gap-20 pt-10">
          <div className="flex flex-row gap-3">
            <RxDashboard className="text-[#C276F0]" />

            <div className="flex font-semibold text-[#C276F0]  ">Dashboard</div>
          </div>
          <div className="flex flex-col w-full">
            <div className="text-2xl font-semibold pb-10">
              Hospitals information
            </div>
            <div className="flex flex-row justify-between w-[70em] ">
              <div>
                <button className="bg-[#C276F0] text-white font-bold py-2 px-14 rounded">
                  Add Hospital
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 w-96 mb-4 border rounded"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {currentData.map((card) => (
                <div
                  key={card.id}
                  className="bg-white p-4 border rounded shadow"
                >
                  <div className="flex flex-row gap-24">
                    <img
                      src={card.imageUrl.image1}
                      alt="Card"
                      className="card-image"
                    />
                    <div
                      onClick={() => handleEdit(card.id)}
                      className="edit-icon"
                    >
                      <img src={edit} alt="Card" className="card-image" />
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="text-red-300 text-md"
                    >
                      Delete Hospital
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-2 px-4 py-2 ${
                  currentPage === page
                    ? "bg-[#C276F0] text-white"
                    : "bg-gray-200"
                } rounded`}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default Admindashboard;
