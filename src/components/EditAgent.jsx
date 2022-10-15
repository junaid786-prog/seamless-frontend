import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
// import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import Select from 'react-select'
import { createAgentAction, editAgentAction, getMyAgentsAction } from '../Redux/actions/adminActions';
import { userProfileAction } from '../Redux/actions/userActions';
import APIPRODUCTS from '../utitlity/APIProducts';
import AddProduct from './AddProduct';
import MyProducts from './MyProducts';

// positions
const Positions = ['Reseller', 'Agent']
const BetTypes = ['Seamless', 'Transfer']
const Levels = [
    { value: 'Starter', label: 'Starter' },
    { value: 'VIP', label: 'VIP' },
    { value: 'VVIP', label: 'VVIP' },
];

const EditAgent = ({ changeSubSidebarIndex, victim, changeDisplay }) => {
    // agent information
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [betType, setBetType] = useState('Seamless')
    const [selectedLevel, setSelectedLevel] = useState(Levels[1]);
    // contact info
    // PIC = positionInCharge
    const [PIC, setPIC] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [otherContact, setOtherCnt] = useState('')
    // finance contact information
    // F = finance
    const [FPIC, setFPIC] = useState('')
    const [FEmail, setFEmail] = useState('')
    const [FPhone, setFPhone] = useState('')
    const [FOtherContact, setFOtherCnt] = useState('')
    // other information
    const [referer, setReferer] = useState('')
    const [remark, setRemark] = useState('')
    const [status, setStatus] = useState('Active')
    const [category, setCategory] = useState('Games Slot')
    const [productsList, setProductsList] = useState(APIPRODUCTS)
    const Categories = ["Games Slot", "Trading", "Live Casino", "Sportbook", "Poker"]
    const [selectedProducts, setSelectedProducts] = useState([])
    const [ready, setReady] = useState(false)

    const dispatch = useDispatch()
    const alert = useAlert()

    const AgentData = {
        name, password, confirmPassword, level: selectedLevel.label, posiotionInCharge: PIC, email,
        phone: phone ? phone : undefined, otherContact: otherContact ? otherContact : undefined,
        financePositionInCharge: FPIC, financeEmail: FEmail, financePhone: FPhone, financeOtherContact: FOtherContact ? FOtherContact : undefined,
        referer, remark, products: selectedProducts, status
    }

    const sendData = () => {
        if (password === confirmPassword) {
            dispatch(editAgentAction(AgentData, victim._id))
            setReady(true)
            setTimeout(() => {
                dispatch(getMyAgentsAction)
            }, 2000);
        } else {
            alert.error('password and confirm password must match')
        }
        changeDisplay(true)
    }
    const alreadyPresent = (id) => {
        for (let i = 0; i < selectedProducts.length; i++) {
            if (selectedProducts[i].Product_ID === id) return true;
        }
        return false;
    }
    const addProduct = (product) => {
        if (alreadyPresent(product.Product_ID)) {
            return;
        }
        setSelectedProducts(products => [...products, product])
    }
    const add = (product) => setSelectedProducts(products => [...products, product])
    return (
        <div className='profile_tab selected_tab add_agent'>
            <h2>Edit Agent</h2>
            <div className='add_agent_tab'>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Agent Information</h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>User name <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Username' value={victim.userName} readOnly />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Password <span className='r_color'>*</span></p>
                                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Position Type <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Position' value={victim.positionType} readOnly />
                            </div>
                            {
                                victim.positionType === 'Agent' && <div className='profile_info_combo'>
                                    <p>Bet Type <span className='r_color'>*</span></p>
                                    <div className='positions_input'>
                                        <button className='position_btn selected_pos_btn'> {victim.betType}</button>
                                    </div>
                                </div>
                            }
                            <div className='profile_info_combo'>
                                <p>Credit <span className='r_color'>*</span></p>
                                <input type='number' placeholder='credit range: 1 - 1000' value={victim && victim.credit} readOnly />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Level <span className='r_color'>*</span></p>
                                <Select
                                    defaultValue={selectedLevel}
                                    onChange={setSelectedLevel}
                                    options={Levels}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='profile_credit'>
                        <h3></h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Name <span className='r_color'>*</span></p>
                                <input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Confirm Password <span className='r_color'>*</span></p>
                                <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Currency</p>
                                <input type='text' value={victim && victim.currency} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Contact Information</h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Person Incharge <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Person In Charge' value={PIC} onChange={(e) => setPIC(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Phone <span className='r_color'>*</span></p>
                                <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='profile_credit'>
                        <h3></h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Email <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Other Contact <span className='r_color'>*</span></p>
                                <input type='number' placeholder='Other Contact' value={otherContact} onChange={(e) => setOtherCnt(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Status</h3>
                        <div className='permission_combo second_combo'>
                            <div><input type='radio' value='Active' id='Active' name='Payment' onChange={(e) => { setStatus(e.target.value) }} /> <label htmlFor='Active'>Active</label></div>
                            <div><input type='radio' value='Suspend' id='Suspend' name='Payment' onChange={(e) => { setStatus(e.target.value) }} /><label htmlFor='Suspend'>Suspend</label></div>
                        </div>
                    </div>
                </div>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Finance Contact Information</h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Finance Person Incharge <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Person IN Charge' value={FPIC} onChange={(e) => setFPIC(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Finance Phone No <span className='r_color'>*</span></p>
                                <input type='number' placeholder='Finance Phone No' value={FPhone} onChange={(e) => setFPhone(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='profile_credit'>
                        <h3></h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Finance Email <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Finance Email' value={FEmail} onChange={(e) => setFEmail(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Finance Other Contact <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Finance Other Contact' value={FOtherContact} onChange={(e) => setFOtherCnt(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Other Information</h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Referer <span className='r_color'>*</span></p>
                                <input type='text' value={referer} onChange={(e) => setReferer(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='profile_credit'>
                        <h3></h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Remark <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Remark' value={remark} onChange={(e) => setRemark(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Product Royality Setting</h3>
                        <div className='profile_card_form'>
                            <div className='my_products'>
                                <div className='products_categories'>
                                    {Categories.map((cat, index) => {
                                        return <div className={cat === category ? 'product_category product_category_active' : 'product_category'} key={index} onClick={() => setCategory(cat)}><p>{cat}</p></div>
                                    })}
                                </div>
                                <div className='products_list products_list_a'>
                                    <div>
                                        {productsList && productsList.filter(product => product.Category === category).map((product, key) => {
                                            return <AddProduct addProductFun={addProduct(product)} key={key} product={product} add={add} selectedProducts={selectedProducts} />
                                        })}
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>
                </div>
                <div className='section_input'>
                    <button type='submit' onClick={sendData}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default EditAgent