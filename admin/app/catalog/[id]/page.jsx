'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Eye, Plus, X, Trash2 } from 'lucide-react';
import Link from 'next/link';

const LUCIDE_ICONS = [
  'Leaf', 'Coffee', 'Wheat', 'Flame', 'Package', 'Award', 'Globe',
  'ShoppingBag', 'Box', 'Truck', 'Factory', 'TreePine', 'Sprout'
];

export default function EditCatalog() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Basic fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [secondaryImage, setSecondaryImage] = useState('');
  const [icon, setIcon] = useState('Globe');
  const [published, setPublished] = useState(false);
  
  // Color theme
  const [colorPrimary, setColorPrimary] = useState('#FFFFF0');
  const [colorSecondary, setColorSecondary] = useState('#FFFEF7');
  const [colorAccent, setColorAccent] = useState('#8B9A7E');
  const [gradientColors, setGradientColors] = useState(['#FFFFF0', '#FFFEF7', '#FBF9F1']);
  
  // Product description
  const [prodDescTitle, setProdDescTitle] = useState('');
  const [prodDescContent, setProdDescContent] = useState(['']);
  const [prodDescImage, setProdDescImage] = useState('');
  const [prodDescBadges, setProdDescBadges] = useState(['']);
  
  // Variants
  const [variants, setVariants] = useState([{ name: '', size: '', purity: '' }]);
  
  // Packaging
  const [packaging, setPackaging] = useState(['']);
  
  // Specifications
  const [specifications, setSpecifications] = useState([{ label: '', value: '' }]);
  
  // Certifications
  const [certifications, setCertifications] = useState(['']);
  
  // Use cases
  const [useCases, setUseCases] = useState(['']);
  
  // CTA
  const [ctaTitle, setCtaTitle] = useState('');
  const [ctaDescription, setCtaDescription] = useState('');
  const [ctaButtonText, setCtaButtonText] = useState('Get in Touch');

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch(`/api/catalogs/${params.id}`);
        const result = await response.json();
        
        if (result.success && result.catalog) {
          const catalog = result.catalog;
          setTitle(catalog.title || '');
          setDescription(catalog.description || '');
          setSlug(catalog.slug || '');
          setHeroImage(catalog.heroImage || '');
          setSecondaryImage(catalog.secondaryImage || '');
          setIcon(catalog.icon || 'Globe');
          setPublished(catalog.published || false);
          
          if (catalog.colorTheme) {
            setColorPrimary(catalog.colorTheme.primary || '#FFFFF0');
            setColorSecondary(catalog.colorTheme.secondary || '#FFFEF7');
            setColorAccent(catalog.colorTheme.accent || '#8B9A7E');
            setGradientColors(catalog.colorTheme.gradient || ['#FFFFF0', '#FFFEF7', '#FBF9F1']);
          }
          
          if (catalog.sections?.productDescription) {
            setProdDescTitle(catalog.sections.productDescription.title || '');
            setProdDescContent(catalog.sections.productDescription.content || ['']);
            setProdDescImage(catalog.sections.productDescription.image || '');
            setProdDescBadges(catalog.sections.productDescription.badges || ['']);
          }
          
          setVariants(catalog.sections?.variants || [{ name: '', size: '', purity: '' }]);
          setPackaging(catalog.sections?.packaging || ['']);
          setSpecifications(catalog.sections?.specifications || [{ label: '', value: '' }]);
          setCertifications(catalog.sections?.certifications || ['']);
          setUseCases(catalog.sections?.useCases || ['']);
          
          if (catalog.cta) {
            setCtaTitle(catalog.cta.title || '');
            setCtaDescription(catalog.cta.description || '');
            setCtaButtonText(catalog.cta.buttonText || 'Get in Touch');
          }
        }
      } catch (error) {
        console.error('Error fetching catalog:', error);
        alert('Error loading catalog');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCatalog();
    }
  }, [params.id]);

  const addArrayItem = (setter, currentArray) => {
    setter([...currentArray, '']);
  };

  const removeArrayItem = (setter, currentArray, index) => {
    setter(currentArray.filter((_, i) => i !== index));
  };

  const updateArrayItem = (setter, currentArray, index, value) => {
    const newArray = [...currentArray];
    newArray[index] = value;
    setter(newArray);
  };

  const addVariant = () => {
    setVariants([...variants, { name: '', size: '', purity: '' }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { label: '', value: '' }]);
  };

  const removeSpecification = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (index, field, value) => {
    const newSpecs = [...specifications];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setSpecifications(newSpecs);
  };

  const addGradientColor = () => {
    setGradientColors([...gradientColors, '#FFFFFF']);
  };

  const handleSave = async (publish = false) => {
    if (!title.trim() || !description.trim()) {
      alert('Please fill in title and description');
      return;
    }

    setSaving(true);
    try {
      const catalogData = {
        title,
        description,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        heroImage,
        secondaryImage,
        icon,
        colorTheme: {
          primary: colorPrimary,
          secondary: colorSecondary,
          accent: colorAccent,
          gradient: gradientColors.filter(c => c.trim()),
        },
        sections: {
          productDescription: prodDescTitle ? {
            title: prodDescTitle,
            content: prodDescContent.filter(c => c.trim()),
            image: prodDescImage,
            badges: prodDescBadges.filter(b => b.trim()),
          } : undefined,
          variants: variants.filter(v => v.name.trim()).length > 0 
            ? variants.filter(v => v.name.trim())
            : undefined,
          packaging: packaging.filter(p => p.trim()).length > 0
            ? packaging.filter(p => p.trim())
            : undefined,
          specifications: specifications.filter(s => s.label.trim() && s.value.trim()).length > 0
            ? specifications.filter(s => s.label.trim() && s.value.trim())
            : undefined,
          certifications: certifications.filter(c => c.trim()).length > 0
            ? certifications.filter(c => c.trim())
            : undefined,
          useCases: useCases.filter(u => u.trim()).length > 0
            ? useCases.filter(u => u.trim())
            : undefined,
        },
        cta: ctaTitle ? {
          title: ctaTitle,
          description: ctaDescription,
          buttonText: ctaButtonText,
        } : undefined,
        published: publish,
      };

      const response = await fetch(`/api/catalogs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catalogData),
      });

      const result = await response.json();
      if (result.success) {
        router.push('/');
      } else {
        alert('Failed to update catalog: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating catalog:', error);
      alert('Error updating catalog');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this catalog? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/catalogs/${params.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        router.push('/');
      } else {
        alert('Failed to delete catalog: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting catalog:', error);
      alert('Error deleting catalog');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1D3557] to-[#5D7183]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-[#A7B5C6]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="p-1.5 sm:p-2 text-[#5D7183] hover:bg-[#5D7183]/10 rounded-lg transition-colors touch-manipulation"
                title="Back to Dashboard"
              >
                <ArrowLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1D3557]">Edit Catalog</h1>
                <p className="text-xs sm:text-sm text-[#5D7183] mt-0.5 sm:mt-1">Update catalog information</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end sm:justify-start">
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm sm:text-base touch-manipulation"
              >
                <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                Delete
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border border-[#A7B5C6] text-[#5D7183] rounded-lg hover:bg-[#5D7183]/10 transition-colors disabled:opacity-50 font-medium text-sm sm:text-base touch-manipulation"
              >
                <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Save Draft</span>
                <span className="sm:hidden">Draft</span>
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 font-medium text-sm sm:text-base touch-manipulation"
              >
                <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                {saving ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor - Same form as new page */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 max-w-6xl">
        {/* Reuse the same form structure from new/page.jsx */}
        <div className="space-y-6 sm:space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#1D3557]">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                placeholder="e.g., Makhana Catalog"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base resize-none"
                placeholder="Brief description of the catalog"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
                placeholder="makhana-catalog"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1D3557] mb-2">
                  Hero Image URL *
                </label>
                <input
                  type="url"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1D3557] mb-2">
                  Secondary Image URL
                </label>
                <input
                  type="url"
                  value={secondaryImage}
                  onChange={(e) => setSecondaryImage(e.target.value)}
                  className="w-full px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                  placeholder="https://example.com/image2.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Icon
              </label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
              >
                {LUCIDE_ICONS.map(iconName => (
                  <option key={iconName} value={iconName}>{iconName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Color Theme */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#1D3557]">Color Theme</h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1D3557] mb-2">
                  Primary Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={colorPrimary}
                    onChange={(e) => setColorPrimary(e.target.value)}
                    className="w-12 h-10 sm:w-16 sm:h-10 border border-[#A7B5C6] rounded-lg cursor-pointer touch-manipulation"
                  />
                  <input
                    type="text"
                    value={colorPrimary}
                    onChange={(e) => setColorPrimary(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
                    placeholder="#FFFFF0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1D3557] mb-2">
                  Secondary Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={colorSecondary}
                    onChange={(e) => setColorSecondary(e.target.value)}
                    className="w-12 h-10 sm:w-16 sm:h-10 border border-[#A7B5C6] rounded-lg cursor-pointer touch-manipulation"
                  />
                  <input
                    type="text"
                    value={colorSecondary}
                    onChange={(e) => setColorSecondary(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
                    placeholder="#FFFEF7"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1D3557] mb-2">
                  Accent Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={colorAccent}
                    onChange={(e) => setColorAccent(e.target.value)}
                    className="w-12 h-10 sm:w-16 sm:h-10 border border-[#A7B5C6] rounded-lg cursor-pointer touch-manipulation"
                  />
                  <input
                    type="text"
                    value={colorAccent}
                    onChange={(e) => setColorAccent(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
                    placeholder="#8B9A7E"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Gradient Colors (for background)
              </label>
              {gradientColors.map((color, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      const newColors = [...gradientColors];
                      newColors[index] = e.target.value;
                      setGradientColors(newColors);
                    }}
                    className="w-12 h-10 sm:w-16 sm:h-10 border border-[#A7B5C6] rounded-lg cursor-pointer touch-manipulation"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => {
                      const newColors = [...gradientColors];
                      newColors[index] = e.target.value;
                      setGradientColors(newColors);
                    }}
                    className="flex-1 px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
                    placeholder="#FFFFFF"
                  />
                  {gradientColors.length > 1 && (
                    <button
                      onClick={() => removeArrayItem(setGradientColors, gradientColors, index)}
                      className="px-2 sm:px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg touch-manipulation flex-shrink-0"
                    >
                      <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addGradientColor}
                className="mt-2 px-4 py-2 text-[#5D7183] border border-[#A7B5C6] rounded-lg hover:bg-[#5D7183]/10"
              >
                <Plus size={16} className="inline mr-2" />
                Add Color
              </button>
            </div>
          </div>

          {/* Product Description */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#1D3557]">Product Description</h2>
            
            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={prodDescTitle}
                onChange={(e) => setProdDescTitle(e.target.value)}
                className="w-full px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                placeholder="e.g., Premium Makhana from India"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Content Paragraphs
              </label>
              {prodDescContent.map((content, index) => (
                <div key={index} className="mb-2 flex gap-2">
                  <textarea
                    value={content}
                    onChange={(e) => updateArrayItem(setProdDescContent, prodDescContent, index, e.target.value)}
                    rows={2}
                    className="flex-1 px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                    placeholder="Enter paragraph text"
                  />
                  {prodDescContent.length > 1 && (
                    <button
                      onClick={() => removeArrayItem(setProdDescContent, prodDescContent, index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem(setProdDescContent, prodDescContent)}
                className="mt-2 px-4 py-2 text-[#5D7183] border border-[#A7B5C6] rounded-lg hover:bg-[#5D7183]/10"
              >
                <Plus size={16} className="inline mr-2" />
                Add Paragraph
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Description Image URL
              </label>
              <input
                type="url"
                value={prodDescImage}
                onChange={(e) => setProdDescImage(e.target.value)}
                className="w-full px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Badges
              </label>
              {prodDescBadges.map((badge, index) => (
                <div key={index} className="mb-2 flex gap-2">
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => updateArrayItem(setProdDescBadges, prodDescBadges, index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                    placeholder="e.g., 100% Natural"
                  />
                  {prodDescBadges.length > 1 && (
                    <button
                      onClick={() => removeArrayItem(setProdDescBadges, prodDescBadges, index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem(setProdDescBadges, prodDescBadges)}
                className="mt-2 px-4 py-2 text-[#5D7183] border border-[#A7B5C6] rounded-lg hover:bg-[#5D7183]/10"
              >
                <Plus size={16} className="inline mr-2" />
                Add Badge
              </button>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#1D3557]">Variants / Grades</h2>
            {variants.map((variant, index) => (
              <div key={index} className="border border-[#A7B5C6]/30 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-[#1D3557]">Variant {index + 1}</h3>
                  {variants.length > 1 && (
                    <button
                      onClick={() => removeVariant(index)}
                      className="text-red-600 hover:bg-red-50 px-2 py-1 rounded"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <input
                    type="text"
                    placeholder="Name (e.g., Premium A)"
                    value={variant.name}
                    onChange={(e) => updateVariant(index, 'name', e.target.value)}
                    className="px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                  />
                  <input
                    type="text"
                    placeholder="Size (e.g., 20-22mm)"
                    value={variant.size || ''}
                    onChange={(e) => updateVariant(index, 'size', e.target.value)}
                    className="px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                  />
                  <input
                    type="text"
                    placeholder="Purity (e.g., 99.5%)"
                    value={variant.purity || ''}
                    onChange={(e) => updateVariant(index, 'purity', e.target.value)}
                    className="px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addVariant}
              className="px-4 py-2 text-[#5D7183] border border-[#A7B5C6] rounded-lg hover:bg-[#5D7183]/10"
            >
              <Plus size={16} className="inline mr-2" />
              Add Variant
            </button>
          </div>

          {/* Packaging */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#1D3557]">Packaging Options</h2>
            {packaging.map((pack, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={pack}
                  onChange={(e) => updateArrayItem(setPackaging, packaging, index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                  placeholder="e.g., 50g pouches"
                />
                {packaging.length > 1 && (
                  <button
                    onClick={() => removeArrayItem(setPackaging, packaging, index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem(setPackaging, packaging)}
              className="px-4 py-2 text-[#5D7183] border border-[#A7B5C6] rounded-lg hover:bg-[#5D7183]/10"
            >
              <Plus size={16} className="inline mr-2" />
              Add Packaging Option
            </button>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#1D3557]">Specifications</h2>
            {specifications.map((spec, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Label (e.g., Moisture Content)"
                  value={spec.label}
                  onChange={(e) => updateSpecification(index, 'label', e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
                />
                <input
                  type="text"
                  placeholder="Value (e.g., Max 8-10%)"
                  value={spec.value}
                  onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
                />
                {specifications.length > 1 && (
                  <button
                    onClick={() => removeSpecification(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addSpecification}
              className="px-4 py-2 text-[#5D7183] border border-[#A7B5C6] rounded-lg hover:bg-[#5D7183]/10"
            >
              <Plus size={16} className="inline mr-2" />
              Add Specification
            </button>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#1D3557]">Certifications</h2>
            {certifications.map((cert, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={cert}
                  onChange={(e) => updateArrayItem(setCertifications, certifications, index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                  placeholder="e.g., FSSAI Certified"
                />
                {certifications.length > 1 && (
                  <button
                    onClick={() => removeArrayItem(setCertifications, certifications, index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem(setCertifications, certifications)}
              className="px-4 py-2 text-[#5D7183] border border-[#A7B5C6] rounded-lg hover:bg-[#5D7183]/10"
            >
              <Plus size={16} className="inline mr-2" />
              Add Certification
            </button>
          </div>

          {/* Use Cases */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#1D3557]">Use Cases</h2>
            {useCases.map((useCase, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={useCase}
                  onChange={(e) => updateArrayItem(setUseCases, useCases, index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                  placeholder="e.g., Healthy Snacking"
                />
                {useCases.length > 1 && (
                  <button
                    onClick={() => removeArrayItem(setUseCases, useCases, index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem(setUseCases, useCases)}
              className="px-4 py-2 text-[#5D7183] border border-[#A7B5C6] rounded-lg hover:bg-[#5D7183]/10"
            >
              <Plus size={16} className="inline mr-2" />
              Add Use Case
            </button>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#1D3557]">Call to Action</h2>
            
            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                CTA Title
              </label>
              <input
                type="text"
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
                className="w-full px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                placeholder="e.g., Ready to Export Premium Makhana?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                CTA Description
              </label>
              <textarea
                value={ctaDescription}
                onChange={(e) => setCtaDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                placeholder="Contact us today for pricing, samples, and bulk order inquiries."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={ctaButtonText}
                onChange={(e) => setCtaButtonText(e.target.value)}
                className="w-full px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                placeholder="Get in Touch"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


