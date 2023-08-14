import"./style-3f9d7e1e.js";const y="https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",b="https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",f=1024-75,w=640,D={top:20,right:20,bottom:30,left:40},u=256,h=10,d={top:20,left:f/3+u},g=["#eff6ff","#dbeafe","#bfdbfe","#93c5fd","#60a5fa","#3b82f6","#2563eb","#1d4ed8","#1e40af"],j=async(o=y,a=b)=>{const s=await fetch(o).then(t=>t.json()),n=await fetch(a).then(t=>t.json());return{countiesData:topojson.feature(n,n.objects.counties).features,statesData:topojson.mesh(n,n.objects.states,(t,e)=>t!==e),educationData:s}},l=d3.scaleThreshold().domain(d3.range(2.6,75.1,(75.1-2.6)/8)).range(g),$=({clientX:o,clientY:a},{bachelorsOrHigher:s,area_name:n,state:t})=>{const e=d3.select("#tooltip"),c=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;let r=o+10;const m=a+window.scrollY-28,p=144;r+p+D.right>c&&(r=o-p-10),e.style("display","block").style("transform",`translate(${r}px,${m}px)`).attr("data-education",s||0).html(`${n}, <b>${t}</b>: <i>${s||0}%</i>`)},W=()=>{d3.select("#tooltip").style("display","none")},i=d3.select("#chart-container").append("svg").attr("width",f).attr("height",w),k=(o,a,s)=>{const n=d3.geoPath(),t=e=>{const[c]=s.filter(({fips:r})=>r===e);return c||0};i.append("g").selectAll("path").data(o).enter().append("path").attr("d",n).attr("fill",({id:e})=>l(t(e).bachelorsOrHigher||0)).attr("class","hover:fill-blue-900 cursor-pointer county").attr("data-fips",({id:e})=>e).attr("data-education",({id:e})=>t(e).bachelorsOrHigher||0).on("mouseover",(e,{id:c})=>$(e,t(c))).on("mouseout",W),i.append("path").datum(a).attr("d",n).attr("class","stroke-white fill-none")},v=()=>{const o=l.domain(),a=d3.scaleBand().range([0,u]).domain(o).padding(1),s=d3.axisBottom(a).tickValues(o).tickFormat(t=>`${Math.round(t)}%`);i.append("g").attr("transform",`translate(${d.left},${h+d.top})`).call(s);const n=g.map(t=>l.invertExtent(t));i.append("g").attr("id","legend").attr("transform",`translate(${d.left},${d.top})`).selectAll("rect").data(n).enter().append("rect").attr("x",([t])=>a(t)).attr("y",0).attr("width",([t,e])=>e===void 0||t===void 0?0:a(e)-a(t)).attr("height",h).attr("fill",([t])=>l(t))},x=async()=>{const{countiesData:o,statesData:a,educationData:s}=await j();document.getElementById("spinner").style.display="none",document.getElementById("chart-container").style.display="block",k(o,a,s),v()};x();
