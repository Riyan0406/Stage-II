interface Register {
  fullname: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

interface UserProfileType {
  id: string;
  username: string;
  fullname: string;
  email: string;
  password: null;
  profile_picture: string;
  bio: string;
  created_at: string;
  updated_at: string;
  followers: FollowType[];
  followings: FollowType[];
}

interface FollowType {
  id: string;
  follower: string;
  following: string;
}

interface SearchUserType {
  id: string;
  username: string;
  fullname: string;
  email: string;
  password: null;
  profile_picture: string;
  bio: string | null;
  created_at: string;
  updated_at: string;
}
