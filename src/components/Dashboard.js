import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer,
  Line,LineChart,
  PieChart, Pie,
  AreaChart, Area
} from 'recharts';

const data = [
  {
    name: 'Jan', uv: 4000, pv: 4000, amt: 2400,
  },
  {
    name: 'Feb', uv: 7000, pv: 4000, amt: 2210,
  },
  {
    name: 'Mar', uv: 5000, pv: 2000, amt: 2290,
  },
  {
    name: 'Apr', uv: 6780, pv: 2300, amt: 2000,
  },
  {
    name: 'May', uv: 5890, pv: 2600, amt: 2181,
  },
  {
    name: 'Jun', uv: 4290, pv: 2600, amt: 2500,
  },
  {
    name: 'Jul', uv: 3490, pv: 5000, amt: 2100,
  },
  {
    name: 'Aug', uv: 3490, pv: 5500, amt: 2100,
  },
  {
    name: 'Sep', uv: 4490, pv: 4300, amt: 2100,
  },
  {
    name: 'Oct', uv: 5490, pv: 4300, amt: 2100,
  },
  {
    name: 'Nov', uv: 7490, pv: 5000, amt: 2100,
  },
  {
    name: 'Dec', uv: 6490, pv: 5000, amt: 2100,
  }
];

const lineData = [
  {name:'15' , value:4000},
  {name:'16' , value:2300},
  {name:'17' , value:2600},
  {name:'18' , value:2300},
  {name:'19' , value:5500},
  {name:'20' , value:4300},
  {name:'21' , value:4700}
]

const listOfSales = [
  {productName:'Dier Saunage Parfum 100ml', number:1324},
  {productName:'Kinder Joy Eggs', number:938},
  {productName:'Dier Saunage Parfum Complete', number:900},
  {productName:'Test Product', number:850},
  {productName:'Dier Saunage Parfum 100ml', number:800},
  {productName:'Dier Saunage Parfum 100ml', number:750},
  {productName:'Dier Saunage Parfum 100ml', number:520}
];

const pieData = [
  { name: 'Beauty', value: 400 },
  { name: 'Fashion', value: 300 },
  { name: 'Furniture', value: 300 },
  { name: 'Table', value: 200 },
  { name: 'Picture', value: 200 },
  { name: 'Other', value: 100 },
];

const areaData = [
  { name: 'Mon', value1: 30, value2:80 },
  { name: 'Sun', value1: 80, value2:30 },
  { name: 'Tues', value1: 50, value2:60 },
  { name: 'Wed', value1: 30, value2:90 },
  { name: 'Thurs', value1: 100, value2:30 },
  { name: 'Fri', value1: 40, value2:90 },
];
const COLORS = ['#0088fe', '#5eff5a', '#FFBB28', '#FF8042','#ef3e36ff','#01F1E3'];

let totalValue = 0;

pieData.forEach((data) => {
  totalValue += data.value;
})

const Dashboard = () => {
    return (
      <>
        <div className="row mb-4">
          <div className="col-12 col-md-5 mb-3 mb-md-0">
            <div className="custom-card custom-card__dark-background d-flex flex-column px-4 pt-3 pb-4">
              <div className="custom-card-header mb-2"> 
                Search Activity
              </div>
              <hr></hr>
              <div className="custom-card-body  wrapper mt-3">
              <ResponsiveContainer width="99%" height="99%">
                <BarChart
                   data={data}
                   margin={{left:-20,right:0,top:0,bottom:0}}
                >
                  <XAxis dataKey="name" tickMargin={5} interval={1} tickSize={10} stroke="rgba(255,255,255,0.2)" />
                  <YAxis  axisLine={false} tickLine={false} stroke="rgba(255,255,255,0.2)" />
                  <Tooltip cursor={false} />
                  <Bar dataKey="uv" radius={10} barSize={10}/>
                </BarChart>
              </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-3 mb-md-0">
            <div className="custom-card custom-card__green-background d-flex flex-column">
              <div className="custom-card-header d-flex flex-column p-4">
                  <span>12,756</span>
                  <small>Total sales of products this month</small>
              </div>
              <div className="custom-card-body wrapper">
                <ResponsiveContainer width="99%" height="99%">
                  <LineChart data={lineData}>
      
                    <Line type="monotone" dataKey="value" activeDot={{ stroke: 'red', strokeWidth: 2, r: 5 }} dot={false} stroke="#fff" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="custom-card custom-card__dark-background d-flex flex-column px-4 pt-3 pb-4">
              <div className="custom-card-header mb-2">
                Top Sales
              </div>
              <hr />
              <div className="custom-card-body mt-2">
                  <ol>
                    {listOfSales.map((product,index) => 
                      <li key={index} className="row mx-0">
                        <div className="list-item d-flex ml-3 justify-content-between">
                          <span>{product.productName}</span>
                          <span>{product.number}</span>
                        </div>
                        
                      </li>
                    )}
                  </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="custom-card custom-card__dark-background d-flex flex-column px-4 pt-3 pb-4">
              <div className="custom-card-header mb-2">
                  Sales Distribution
              </div>
              <hr />
              <div className="custom-card-body wrapper mt-4 row mx-0">
                <div className="col-12 col-md-5 pr-0 mb-3 mb-md-0">
                <ResponsiveContainer width="99%" height="99%">
                  <PieChart>
                      <Tooltip />
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        stroke="false"
                        dataKey="value"
                      >
                        {
                          pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="col-7 pl-4 d-none d-md-block">
                      <ul className="wrapper ml-4">
                        {
                          pieData.map((data,index) =>
                          <li key={index} className="row mx-0">
                            <div className="list-item d-flex ml-1 justify-content-between">
                              <span>{data.name}</span>
                              <div>
                                <span>{((data.value / totalValue ) * 100).toFixed(2)}%</span>
                                <span className="ml-4">{data.value}</span>
                              </div>
                             
                            </div>
                          </li>
                          )
                        }
                      </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="custom-card custom-card__dark-background d-flex flex-column px-4 pt-3 pb-4">
              <div className="custom-card-header mb-2"> 
                Business Overview
              </div>
              <hr></hr>
              <div className="custom-card-body  wrapper mt-3">
              <ResponsiveContainer width="99%" height="99%">
                <AreaChart
                data={areaData}
                margin={{left:-20,right:5,top:5,bottom:0}}
              >
                
                <XAxis dataKey="name" axisLine={false} dx={30}
                tickLine={false} padding={{left:10}} stroke="rgba(255,255,255,0.2)" />
                <YAxis  axisLine={false} tickLine={false} stroke="rgba(255,255,255,0.2)" />
                <Tooltip />
                <Area type="monotone" dataKey="value1" stackId="1" stroke="#5eff1a" fill="#5eff5a" />
                <Area type="monotone" dataKey="value2" stackId="2" stroke="#01F1FF" fill="#01F1E3" />
                </AreaChart>
              </ResponsiveContainer>
              </div>
            </div>
          </div>
          
        </div>
      </>
    )
  }

  export default Dashboard;