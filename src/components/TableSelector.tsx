import React, { useEffect, useState } from 'react'

type Item = {
  value: string
  label: string
}

type ItemListProps = {
  items: Item[]
  preSelectedItems?: Item[]
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function
  isRequired?: boolean
}
const TableSelector: React.FC<ItemListProps> = ({ items, preSelectedItems, onChange }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>(preSelectedItems || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSearchTerm, setSelectedSearchTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState<Item[]>(items)
  const [selectedFilteredItems, setSelectedFilteredItems] = useState<Item[] | undefined>(preSelectedItems)

  const handleItemSelection = (item: Item) => {
    setSelectedItems([...selectedItems, item])
    setSelectedFilteredItems([...selectedItems, item])
  }

  const handleItemDeselection = (item: Item) => {
    setSelectedItems(selectedItems.filter((i) => i.value !== item.value))
    setSelectedFilteredItems(selectedItems.filter((i) => i.value !== item.value))
  }

  const handleSelectAll = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault()
    setSelectedItems(items)
    setSelectedFilteredItems(items)
  }

  const handleDeselectAll = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault()
    setSelectedItems([])
    setSelectedFilteredItems([])
  }
  useEffect(() => {
    onChange(selectedItems)
  }, [onChange, selectedItems])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setFilteredItems(items.filter((item) => item.label.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  const handleSelectedSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSearchTerm(event?.target?.value)
    setSelectedFilteredItems(
      items.filter((item) => item.label.toLowerCase().includes(event.target.value.toLowerCase())),
    )
  }
  return (
    <div className='grid grid-cols-2 select-none max-md:grid-cols-1'>
      <div className='border flex flex-col'>
        <div className='flex w-full items-center border h-12 py-2 px-3 bg-white'>
          <input
            className='flex-grow !border-0'
            placeholder='Search...'
            type='text'
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className='shrink-0'>
            <span className='material-symbols-outlined text-grey text-2xl'>search</span>
          </div>
        </div>
        <div className='flex-grow max-h-96 overflow-y-auto'>
          <div
            onClick={(e) => {
              if (selectedItems.length === items.length) {
                handleDeselectAll(e)
              } else {
                handleSelectAll(e)
              }
            }}
            className='bg-white p-3 px-5'
          >
            <input
              className='w-4 h-4'
              type='checkbox'
              id='select-all-id'
              checked={selectedItems.length === items.length}
            />
            <span className='ml-5 select-none'>Select All</span>
          </div>
          <table className='bg-transparent w-full'>
            <tbody>
              {filteredItems?.map((item) => (
                <>
                  <tr
                    onClick={() => {
                      if (selectedItems.some((some) => some.value == item.value)) {
                        handleItemDeselection(item)
                      } else {
                        handleItemSelection(item)
                      }
                    }}
                    className='py-3 h-12 hover:bg-grey-50 cursor-pointer'
                    key={item.value}
                  >
                    <td className='my-3 px-5 w-4 h-4'>
                      <input
                        className='w-4 h-4'
                        type='checkbox'
                        checked={selectedItems.some((some) => some?.value == item?.value)}
                        onChange={() => {
                          if (selectedItems.some((some) => some.value == item.value)) {
                            handleItemDeselection(item)
                          } else {
                            handleItemSelection(item)
                          }
                        }}
                      />
                    </td>
                    <td>{item?.label}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='border flex flex-col'>
        <div className='flex w-full items-center border h-12 py-2 px-3 bg-white'>
          <input
            className='flex-grow !border-0'
            placeholder='Search...'
            type='text'
            value={selectedSearchTerm}
            onChange={handleSelectedSearch}
          />
          <div className='shrink-0'>
            <span className='material-symbols-outlined text-grey text-2xl'>search</span>
          </div>
        </div>
        <div className='flex justify-between border py-3 h-12 px-3 bg-white'>
          <div className=''>{selectedItems.length == 0 ? 'None Selected' : `${selectedItems.length} Selected`}</div>
          <button
            className='text-blue-500'
            onClick={(e) => {
              handleDeselectAll(e)
            }}
          >
            Clear All
          </button>
        </div>

        <div className='max-h-96 overflow-y-auto'>
          <table className=' w-full '>
            <tbody className='bg-white w-full h-full'>
              {selectedFilteredItems?.map((item) => (
                <>
                  {selectedItems?.find((x) => x.value === item.value) && (
                    <tr
                      onClick={(e) => {
                        e.preventDefault()
                        handleItemDeselection(item)
                      }}
                      className='hover:bg-gray-100 h-12 cursor-pointer relative'
                      key={item?.value}
                    >
                      <td className='pl-4'>{item?.label}</td>
                      <td className='absolute right-4'>
                        <button>
                          <span className='material-symbols-outlined mt-2'>close</span>
                        </button>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableSelector
