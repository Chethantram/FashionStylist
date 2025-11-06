import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
  name: '',
  brand: '',
  category: '',
  color: '',
  season: 'all-season',
  price: '',
  tags: [],
  image: null, // Can be file or URL string
});
  const [newTag, setNewTag] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const categoryOptions = [
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const colorOptions = [
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'navy', label: 'Navy' },
    { value: 'gray', label: 'Gray' },
    { value: 'beige', label: 'Beige' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'brown', label: 'Brown' },
    { value: 'pink', label: 'Pink' }
  ];

  const seasonOptions = [
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' },
    { value: 'winter', label: 'Winter' },
    { value: 'all-season', label: 'All Season' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e?.target?.result);
      reader?.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (newTag?.trim() && !formData?.tags?.includes(newTag?.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev?.tags, newTag?.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev?.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async(e) => {
    e?.preventDefault();
    // if (formData?.name && formData?.category) {
    //   const newItem = {
    //     id: Date.now(),
    //     ...formData,
    //     image: imagePreview || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop`,
    //     wearFrequency: 0,
    //     costPerWear: formData?.price ? parseFloat(formData?.price) : 0,
    //     stylingPotential: Math.floor(Math.random() * 40) + 60,
    //     addedAt: new Date()
    //   };
    //   onAddItem(newItem);
    //   resetForm();
    //   onClose();
    // }
    try {
      const response  = await axios.post('http:localhost:5000/api/wadrope/add', formData,{withCredentials:true});
      console.log(response.data);
      if (response.data?.success) {
        const newItem = response.data?.data;
        onAddItem(newItem);
        resetForm();
        onClose();
        toast.success(response?.data?.message || 'Item added successfully!');
      }else{
        toast.error(response?.data?.message || 'Failed to add item. Please try again.');
      }

      

    } catch (error) {
      console.log(error);
      alert('Failed to add item. Please try again.');
      
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      category: '',
      color: '',
      season: '',
      price: '',
      image: null,
      tags: []
    });
    setImagePreview(null);
    setNewTag('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-brand-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-brand-text-primary">
            Add New Item
          </h2>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-3">
                Item Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Icon name="Camera" size={24} className="text-brand-text-secondary mx-auto mb-2" />
                      <p className="text-xs text-brand-text-secondary">Upload Photo</p>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button
                      type="button"
                      variant="outline"
                      iconName="Upload"
                      iconPosition="left"
                      className="cursor-pointer"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      Choose Photo
                    </Button>
                  </label>
                  <p className="text-xs text-brand-text-secondary mt-2">
                    For best results, use good lighting and a clean background
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Item Name"
                type="text"
                placeholder="e.g., Navy Blazer"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                required
              />
              <Input
                label="Brand"
                type="text"
                placeholder="e.g., Zara"
                value={formData?.brand}
                onChange={(e) => handleInputChange('brand', e?.target?.value)}
              />
            </div>

            {/* Category and Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
                required
              />
              <Select
                label="Primary Color"
                options={colorOptions}
                value={formData?.color}
                onChange={(value) => handleInputChange('color', value)}
              />
              <Select
                label="Season"
                options={seasonOptions}
                value={formData?.season}
                onChange={(value) => handleInputChange('season', value)}
              />
            </div>

            {/* Purchase Information */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Purchase Price"
                type="number"
                placeholder="0.00"
                value={formData?.price}
                onChange={(e) => handleInputChange('price', e?.target?.value)}
              />
              <Input
                label="Purchase Date"
                type="date"
                value={formData?.purchaseDate}
                onChange={(e) => handleInputChange('purchaseDate', e?.target?.value)}
              />
            </div> */}

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-3">
                Tags
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  type="text"
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && (e?.preventDefault(), handleAddTag())}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  iconName="Plus"
                  onClick={handleAddTag}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {formData?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-brand-cream text-brand-text-primary text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-error transition-smooth"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Plus"
              iconPosition="left"
              disabled={!formData?.name || !formData?.category}
            >
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;