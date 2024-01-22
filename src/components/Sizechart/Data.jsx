import { CasualBottomwear_boxer,CasualBottomwear_chinos,CasualBottomwear_jeans,CasualBottomwear_joggers,CasualBottomwear_knittedshorts,CasualBottomwear_pajama,CasualBottomwear_trackpants,
  Eveningwear_shirt,
  CasualTopwear_casualshirt,CasualTopwear_sweatshirt,CasualTopwear_tshirt,CasualTopwear_waistcoat,
  Ethnicwear_kurta,
  Formalwear_shirt,Formalwear_trousers,

  bottom_cm,bottom_inch,top_cm,top_inches, 
  sizeguide} from "../../assets/sizechart"

export const Images = [
      {
        name : 'Casual Shirts',
        url: CasualTopwear_casualshirt
  },
  {
    name: 'T-Shirts',
    url:CasualTopwear_tshirt,
  },
  {
    name: 'Core Tee',
    url:CasualTopwear_tshirt,
  },
  {
    name: 'Polo T-Shirts',
    url:CasualTopwear_tshirt,
  },
  {
    name: 'Evening wear Shirts',
    url:CasualTopwear_casualshirt,
  },
  {
    name: 'Ethnic Kurta',
    url:Ethnicwear_kurta,
  },
  {
    name: 'Sweatshirts',
    url:CasualTopwear_sweatshirt
  },
  {
    name: 'Formal Shirts',
    url:Formalwear_shirt,
},
  {
    name: 'Formal Trouser',
    url:Formalwear_trousers,
  },
  {
    name: 'Joggers',
    url:CasualBottomwear_joggers
  },
  {
    name: 'Track Pants',
    url:CasualBottomwear_trackpants
  },
  {
    name: 'Pyjama',
    url:CasualBottomwear_pajama
  },
  {
    name: 'Waist Coat',
    url:CasualTopwear_waistcoat
  },
  {
    name: 'Jeans',
    url:CasualBottomwear_jeans
  },
  {
    name : 'Chino',
    url: CasualBottomwear_chinos
  },
  {
    name: 'Boxers',
    url: CasualBottomwear_boxer
  },
  {
    name: 'Topwear',
    url:[top_cm,top_inches,sizeguide]
  },
  {
    name: 'Bottomwear',
    url:[bottom_cm,bottom_inch,sizeguide]
    
  },
  {
    name : 'Ethnic Wear',
    url : [top_cm,top_inches,sizeguide]
  },
  {
    name : 'Winter Wear',
    url : [CasualTopwear_sweatshirt]
  }
]

