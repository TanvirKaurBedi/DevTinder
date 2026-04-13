const UserCard = ({ post }) => {
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure>
        <img src={post.photoUrl} alt={post.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post.name}</h2>
        {post.age && post.gender && (
          <div className="flex flex-col gap-2">
            <p> {post.age}</p>
            <p> {post.gender}</p>
          </div>
        )}
        <p>{post.about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Accept</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
