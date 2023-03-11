import React from 'react';
import './fullmark.scss';
export default function FullScreenMark(props: any) {
    return (
        <div>
            <table className='table table-earnings table-earnings__challenge'>
                <thead>
                    <tr>
                        <th>#</th>
                        {props.row ? props.row.map((x:any) => {
                            return (<th>{x.tieu_de}</th>
                            );
                        }) : 'Không có thông tin'}
                    </tr>
                    
                </thead>
            </table>
        </div>
    )
    
}