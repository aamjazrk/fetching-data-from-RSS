

interface CategoryChipProps {
    category: string; 
  }
const CategoryChip: React.FC<CategoryChipProps> = ({category}) => (
<div className="bg-cyan-100 text-gray-500 text-xs font-medium m-0.5 px-2.5 py-0.5 rounded ">
    <span>{category}</span>
</div>
)
export default CategoryChip