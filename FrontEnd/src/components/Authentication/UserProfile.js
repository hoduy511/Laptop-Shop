import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, logout, loadAddress } from '../../store/slice/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { changeAvatar, changeBio, createNewAddress, deleteAddressId, getAddressList, getUser, updateAddressId } from '../../services/UserService';
import EditAddressForm from './EditAddressForm';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import alt from '../../assets/image/draw2.webp';
import '../../assets/styles/UserProfile.scss';

const Abouts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector(selectAccessToken);
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn);
  const [addressList, setAddressList] = useState('');
  const [editingAddress, setEditingAddress] = useState(null);
  const [createAddress, setCreateAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editedAddress, setEditedAddress] = useState({
      "id": null,
      "address_type": null,
      "default": null,
      "country": null,
      "city": null,
      "street_address": null,
      "apartment_address": null,
      "postal_code": null,
  });
  const [editedBio, setEditedBio] = useState('');
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newAvatar, setNewAvatar] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const fetchData = async () => {
    setLoading(true);
    if (isLoggedIn) {
      try {
        const response = await getUser(accessToken);
        const addressLists = await getAddressList(accessToken);
        const filteredAddresses = addressLists.results.filter(address => address.address_type !== '');
        console.log(filteredAddresses);
        setUserData(response);
        setLoading(false);
        setAddressList(filteredAddresses);
        dispatch(loadAddress(filteredAddresses));
        setEditedBio(userData.profile.bio);
      } catch (error) {
        // Xử lý lỗi 401 Unauthorized, ví dụ: làm mới token và thử lại yêu cầu
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        setLoading(false); // Đánh dấu rằng yêu cầu đã hoàn thành (có lỗi)
        logout();
      }
    } else {
      navigate('/login');
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Hiển thị thông báo "Loading" trong quá trình gửi yêu cầu
  }

  if (!userData) {
    dispatch(logout(accessToken)); // Hiển thị thông báo lỗi nếu có lỗi khi gửi yêu cầu
    return <p>Error loading user profile</p>;
  }

  const handleUpdateAddress = (address) =>{
    setEditingAddress(address);
    setCreateAddress(false);
    setEditAddress(true);
  }

  const handleDeleteAddress = async (address) =>{
    setLoading(true);
    try{
      await deleteAddressId(accessToken, address);
      toast.success('Xóa thành công!')
    } catch(err){
      toast.error('Lỗi');
    }
    fetchData();
    setLoading(false);
  }

  const handleSaveAddress = async (editedAddress) =>{
    setLoading(true);
    try{
      await updateAddressId(accessToken, editedAddress);
      toast.success('Thay đổi địa chỉ thành công!');
    } catch(err){
      toast.error('Thay đổi địa chỉ không thành công!');
    }
      fetchData();
    setLoading(false);
  }
  
  const handleCancelEdit = () =>{
    setEditingAddress(null);
  }

  const handleAddAddress =() =>{
    setEditedAddress({
      "address_type": 'S',
      "default": false,
      "country": 'VN',
      "city": '',
      "street_address": '',
      "apartment_address": '',
      "postal_code": '',
    })
    setCreateAddress(true);
    setEditAddress(false);
  }

  const handleCreateAddress = async (address) =>{
    setLoading(true);
    console.log(address);
    if(!Object.values(editedAddress).some(value => value === '')){
      try{
        const res = await createNewAddress(accessToken, address);
        console.log(res);
        toast.success('Thêm địa chỉ thành công!');
      } catch(err){
        toast.error('Lỗi khi thêm địa chỉ!');
      }
      fetchData();
      setCreateAddress(false);
    } else{
      toast.warning('Vui lòng điền đầy đủ thông tin!')
    }
    setLoading(false);
  }
  
  const handleCancelCreate = () =>{
    setCreateAddress(false);
  }

  const handleNewAvatar = (e) =>{
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
      handleShow();
    }
  }

  const handleSaveAvatar = async () =>{
    const fd = new FormData();
    fd.append('avatar', newAvatar);
    try{
      await changeAvatar(accessToken, fd);
      toast.success('Đổi ảnh đại diện thành công!');

    } catch(err){
      toast.error('Lỗi');
    }
    fetchData();
    handleClose();
  }

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = async () => {
    await changeBio(accessToken, editedBio);
    fetchData();
    setIsEditingBio(false);
  };

  return (
    <>
      <nav aria-label="breadcrumb" class="main-breadcrumb"
      style={{
        width: '80%',
        margin: '0 auto'
      }}>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">User</li>
        </ol>
      </nav>
      <div className="userprofile-container">
      <div className="main-body">

        <div className="row gutters-sm">
          {/* Left Column */}
          <div className="col-md-4 mb-3">
            {/* Profile Card */}
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center ">
                  <div className='avatar'>
                    <img className='avatar__image rounded-circle' src={userData.profile.avatar ? userData.profile.avatar : "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="Admin" />
                    <label class="fa-solid fa-camera"><input accept='image/*' class="fa-solid fa-camera" onChange={handleNewAvatar} id='newAvatar' name='file' type='file' style={{display: 'none'}}></input></label>
                    <Modal centered aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Chọn ảnh đại diện</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className='new-avatar-container'>
                          <img className='new-avatar' src={newAvatar ? URL.createObjectURL(newAvatar) : alt} alt=''/>
                        </div>
                        </Modal.Body>
                      <Modal.Footer>
                        <Button className='cancel-btn' onClick={handleClose}>
                          Close
                        </Button>
                        <Button className='save-btn' onClick={handleSaveAvatar}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <div className="mt-3">
                    <h4>{userData.last_name} {userData.first_name}</h4>
                    <p className="text-secondary mb-1">Front End Developer</p>
                    <p className="text-muted font-size-sm">HCM City University of Transport</p>
                    {/* <button className="btn btn-primary my-2">Follow</button>
                    <button className="btn btn-outline-primary mx-2">Message</button> */}
                  </div>
                </div>
              </div>
            </div>
            {/* /Profile Card */}

            {/* Social Media Links */}
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                  <i class="fa-brands fa-facebook fa-xl"></i>
                    {' '}Facebook
                  </h6>
                  <a className="text-secondary text-decoration-none" href='https://www.facebook.com/nii.228/'>/nii.228/</a>
                </li>
                {/* Add more social media links here */}
              </ul>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                  <i class="fa-brands fa-github fa-xl"></i>
                  {' '}Github
                  </h6>
                  <a className="text-secondary text-decoration-none" href='https://github.com/nguyenhoangloc2208/'>/nguyenhoangloc2208/</a>
                </li>
                {/* Add more social media links here */}
              </ul>
            </div>
          </div>
          {/* /Left Column */}

          {/* Right Column */}
          <div className="col-md-8">
            {/* User Information */}
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0"><i class="fa-solid fa-user"></i> {' '}Họ và tên</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  {userData.last_name} {userData.first_name}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0"><i class="fa-solid fa-envelope"></i>{' '}Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userData.email}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0"><i class="fa-solid fa-phone"></i>{' '}Số Điện Thoại</h6>
                  </div>
                  {userData && userData.phone_number && Object.keys(userData.phone_number).length > 0 ? (
                    <div className="col-sm-9 text-secondary" >{userData.phone_number}</div>
                  ) : (
                    <div className="col-sm-9 text-secondary" >Chưa có</div>
                  )}
                </div>
                <hr />
                
                {addressList && addressList.length > 0 && (
                  <div>
                    {addressList.map((address, index) => (
                  <div key={index}>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0"><i class="fa-solid fa-address-book"></i> {' '}Địa chỉ {index + 1}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {editAddress && editingAddress === address ? (
                          // Hiển thị giao diện sửa địa chỉ
                          <div className='edit-form'>
                            <EditAddressForm
                              address={address}
                              onSave={setEditedAddress}
                              onCancel={handleCancelEdit}
                            />
                            {editingAddress && (
                              <div>
                                <button className='edit-btn' onClick={() => handleSaveAddress(editedAddress)}>{loading ? <span><i class="fa-solid fa-spinner fa-spin"></i></span> : <span>Lưu</span>}</button>
                                <button className='edit-btn' onClick={handleCancelEdit}>{loading ? <span><i class="fa-solid fa-spinner fa-spin"></i></span> : <span>Hủy</span>}</button>
                                <hr/>
                              </div>
                            )}
                          </div>
                          
                        ) : (
                          <div>
                            {address.apartment_address} / {address.street_address} / {address.city} / {address.country}
                            <div className='icon'>
                              <i onClick={() => handleUpdateAddress(address)} className="fa-solid fa-pen"></i>
                              <i onClick={() => handleDeleteAddress(address)} className="fa-solid fa-circle-xmark"></i>
                              <hr/>
                            </div>
                            <hr />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                  </div>
                )}
                <div className="row">
                  <div className="col-sm-3">
                    <h6 onClick={handleAddAddress} style={{"cursor": "pointer"}} className="mb-0"><i class="fa-solid fa-plus"></i>{' '}Thêm Địa Chỉ</h6>
                  </div>
                  {createAddress === true && <div className='edit-form col-sm-9 text-secondary'>
                            <EditAddressForm
                              address={editedAddress}
                              onSave={setEditedAddress}
                              onCancel={handleCancelCreate}
                            />
                            {createAddress === true && (
                              <div>
                                <button className='edit-btn' onClick={() => handleCreateAddress(editedAddress)}>{loading ? <span><i class="fa-solid fa-spinner fa-spin"></i></span> : <span>Lưu</span>}</button>
                                <button className='edit-btn' onClick={handleCancelCreate}>Hủy</button>
                              </div>
                            )}
                          </div>}
                </div>
              </div>
            </div>
            {/* Project Status */}
            <div className="row gutters-sm">
              <div className="col-sm-12 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">Bio <i style={{cursor: 'pointer'}} onClick={handleEditBio} class="fa-solid fa-pen fa-beat fa-xs"></i></i>
                    </h6>
                    <div className=" mb-3">
                    {isEditingBio ? (
                      <div>
                        <textarea className='bio-text'
                          value={editedBio}
                          onChange={(e) => setEditedBio(e.target.value)}
                          // You might want to set rows, cols, and other textarea attributes
                        />
                        <button className='edit-bio-btn' onClick={handleSaveBio}>Save</button>
                      </div>
                    ) : (
                      <div className="mb-3">
                        <div className="justify-content-center mx-4 text-justify font-weight-light">
                          {userData.profile ? userData.profile.bio : null}
                        </div>
                      </div>
                    )}
                    </div>
                    {/* Add more project status details here */}
                  </div>
                </div>
              </div>
              {/* Add more project status cards here */}
            </div>
          </div>
          {/* /Right Column */}
        </div>
      </div>
    </div>
    </>
  );
}

export default Abouts;
