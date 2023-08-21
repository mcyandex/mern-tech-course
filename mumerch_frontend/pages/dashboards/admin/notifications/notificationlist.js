import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const AdminLayout = dynamic(() => import("../../../components/dashboards/admin/adminlayout"));
const Title = dynamic(() => import("../../../components/title"));

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
  const uid = router.query.uid;

  async function getUserProfile() {
    // Simulate getting user profile data
    const fakeUserProfile = {
      image: "/user-image.jpg", // Replace with actual image URL
      login: {
        name: "John Doe",
        phoneNumber: "123-456-7890",
        email: "john@example.com",
      },
      dateOfBirth: "1990-01-01T00:00:00.000Z", // Replace with actual date
    };
    setUserProfile(fakeUserProfile);
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    !userProfile ? (
      <div>No profile found</div>
    ) : (
      <>
        <Title page="User Profile" />
        <AdminLayout>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center">
                <img src={userProfile.image} alt="image of user" className="w-28 h-28 rounded-full" />
              </div>
              <input type="file" accept="image/*" className="mt-2" />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h5 className="text-lg font-semibold">Personal Information</h5>
              <label className="block">
                Name
                <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={userProfile.login.name} readOnly />
              </label>
              <label className="block">
                Phone Number
                <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={userProfile.login.phoneNumber}
                  readOnly />
              </label>
              <label className="block">
                Email
                <input className="border rounded w-full py-1 px-2 mt-1" type="email" value={userProfile.login.email}
                  readOnly />
              </label>
              <label className="block">
                Date of Birth
                <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={new
                  Date(userProfile.dateOfBirth).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'long',
                    day: 'numeric',
                  })} readOnly />
              </label>
            </div>
          </div>
        </AdminLayout>
      </>
    )
  );
}