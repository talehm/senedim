const attributes={
cv:{
  personal:[
    {type:'text', field:"name" },
    {type:'birthdate', field:"birthdate"},
    {type:'text', field:'address'},
    {type:'cvEmail', field:"cvEmail"},
    {type:'cvPhone', field:"cvPhone"},
    {type:'cvWebsite', field:"cvWebsite"},

  ],
  edu:[
    {type:'fromDate', field:"fromDate" },
    {type:'toDate', field:"toDate" },
    {type:'text', field:'institute' },
    {type:'text', field:'course' }
  ],
  work:[
    {type:'fromDate', field:"fromDate" },
    {type:'toDate', field:"toDate" },
    {type:'text', field:'workplace' },
    {type:'text', field:'position' },
    {type:'textarea', field:'pos' }
  ],
  lang:[
    {type:'dropdown', field:'language' },
  ],
  skills:[
    {type:'tags',field:"skills"},

  ],
  cert:[
    {type:'cert', field:'cert'},
  ],
}
};


export default attributes;
