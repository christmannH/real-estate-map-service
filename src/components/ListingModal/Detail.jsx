import React, { useState } from 'react'
import SaveFavorite from '../SaveFavorite'
import { GoPrimitiveDot } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillDollarCircle } from 'react-icons/ai';
import TabBar from './TabBar';
import './Detail.scss';
import DataDrivenDisplay from './DataDrivenDisplay';

const numFormatter = num => {
    const hindiNumberFormatter = new Intl.NumberFormat("en-US");
    return hindiNumberFormatter.format(num)
}

const Detail = (props) => {
    const {
        data
    } = props

    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = (e) => {
        setScrollTop(e.target.scrollTop);
    }

    return (
        <div className='datailContainer'>
            { data && (
                <>
                    <div className='itemHeader'>
                        <img src='/logo.png' className='modalLogo' alt=''/>
                        <div className='itemAction'>
                            <SaveFavorite itemId={data.System.SystemID}/>
                            <span className='actionBtn' onClick={()=> alert('the Share Agent button was clicked!')}>
                                <RiShareForwardLine size='22'/>&nbsp;Share
                            </span>
                            <span className='actionBtn' onClick={()=> alert('the More button was clicked!')}>
                                <BsThreeDots size='22'/>&nbsp;More
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className='itemMain'>
                        <div className='itemOne itemPrice'>
                            <div className='mb1'>
                                <span className='mainPrice'>${numFormatter(data.System.ListPrice)}</span>
                                <span className='roomCounts font15'>
                                    {data.Layout.Beds || 0} bd | {data.Layout.FB || 0} ba | {numFormatter(data.Layout.EstSF) || 0} sqft
                                </span>
                            </div>
                            <div className='mb1'>
                                {(data.Location['Geo Address Line'] || data.Location['Dir']) + ', ' + data.Location.City + ', ' + data.Location.State + ' ' + data.Location.Zip}
                            </div>
                            <div className='alignCenter mb1'>
                                <GoPrimitiveDot color='red'/>
                                <div className='fontBold'>
                                    &nbsp; {data.System.SaleOrRent}
                                </div>
                                <div>
                                    &nbsp;|&nbsp;Yestimate <sup>@</sup>&nbsp;:<span className='fontBold'>&nbsp;${numFormatter(data.System.ListPrice)}</span>
                                </div>
                            </div>
                            <div className='alignCenter font14 mb2'>
                                <div><span className='fontBold'> Est. payment</span> : ${numFormatter(data.Overview.PriPerSQFT)}/mo</div>
                                <span className='getPayBtn' onClick={()=> alert('the Get pre-qualified button was clicked!')}>
                                    <AiFillDollarCircle size='22'/>&nbsp;Get pre-qualified
                                </span>
                            </div>
                            <div className='itemButtons'>
                                <div className='spaceBetween mt1'>
                                    <div onClick={()=> alert('the Contact Agent button was clicked!')} className='btn btnPrimaryOutline'>Contact Agent</div>
                                    <div onClick={()=> alert('the Take a Tour button was clicked!')} className='btn btnPrimary'>Take a Tour</div>
                                </div>
                            </div>
                        </div>

                        <TabBar scrollTop={scrollTop} />
                        <DataDrivenDisplay data={data} onScroll={handleScroll} />
                    </div>
                </>
              )
            }
        </div>
    );
}
export default Detail