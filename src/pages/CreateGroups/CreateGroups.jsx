import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import swal from "sweetalert";

export const CreateGroups = () => {
  const { user, isDark } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const groupData = Object.fromEntries(formData.entries());

    fetch("https://hobmeet-server.vercel.app/groups", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(groupData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          swal("Good job!", "Group Created Successfully!", "success");
          navigate("/allGroups");
        }
      });
  };

  useEffect(() => {
      document.title = "Create Group - HobMeet";
      return () => {
        document.title = "HobMeet"; // reset on unmount
      };
    }, []);

  return (
    <div
      className={` py-10 min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#36065a] via-[#280146] to-black text-gray-300"
          : "bg-gradient-to-br from-purple-300 via-blue-200 to-blue-300 text-gray-800"
      }`}
    >
      <form
        onSubmit={handleCreateGroup}
        className={`backdrop-blur-lg border p-5 md:p-8 rounded-xl w-full max-w-xl shadow-2xl ${
          isDark ? "bg-white/5 border-white/20" : "bg-white/10 border-white/50"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create a Group</h2>

        <label className="block mb-2 font-medium">
          Group Name:<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="groupName"
          className="w-full p-2 mb-4 border rounded bg-transparent"
          required
        />

        <label className="block mb-2 font-medium">
          Hobby Category:<span className="text-red-500">*</span>
        </label>
        <select
          name="hobbyCategory"
          required
          className="w-full p-2 mb-4 border rounded bg-transparent"
        >
          <option value="Drawing & Painting">Drawing & Painting</option>
          <option value="Photography">Photography</option>
          <option value="Video Gaming">Video Gaming</option>
          <option value="Fishing">Fishing</option>
          <option value="Running">Running</option>
          <option value="Cooking">Cooking</option>
          <option value="Reading">Reading</option>
          <option value="Writing">Writing</option>
        </select>

        <div className="flex md:flex-row flex-col gap-2 mb-4">
          <div className="w-full">
            <label className="block mb-2 font-medium">
              User Name:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="userName"
              value={user.displayName}
              readOnly
              className="w-full p-2 border rounded bg-transparent"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 font-medium">
              User Email:<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              readOnly
              className="w-full p-2 border rounded bg-transparent"
              required
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-2 mb-4">
          <div className="w-full">
            <label className="block mb-2 font-medium">
              Meeting Location:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              className="w-full p-2 border rounded bg-transparent"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 font-medium">
              Max Members:<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="members"
              min="1"
              className="w-full p-2 border rounded bg-transparent"
              required
            />
          </div>
        </div>

        <label className="block mb-2 font-medium">
          End Date:<span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="date"
          min={new Date().toISOString().split("T")[0]}
          className="w-full p-2 mb-4 border  rounded bg-transparent"
          required
        />

        <label className="block mb-2 font-medium">
          Image URL:<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="photo"
          className="w-full p-2 mb-4 border rounded bg-transparent"
          required
        />

        <label className="block mb-2 font-medium">
          Description:<span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          rows="4"
          className="w-full p-2 mb-4 border rounded bg-transparent"
          required
        ></textarea>

        <button
          type="submit"
          className="btn w-full border-none bg-purple-500 text-white font-bold py-2 rounded hover:bg-purple-600 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
};
