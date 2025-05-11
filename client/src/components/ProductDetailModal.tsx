import React, { useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface ProductDetail {
  name: string;
  description: string;
  casNumber?: string;
  applications: string[];
  specifications?: Record<string, string>;
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string; // URL to the product image
  details: ProductDetail[];
  tags: string[];
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductCategory;
}

export default function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  useEffect(() => {
    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-[700px] mt-10 max-h-[85vh] flex flex-col overflow-hidden z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header with Close Button */}
        <div className="sticky top-0 z-50 w-full">
          <div className="relative w-full h-48 bg-gradient-to-br from-primary/90 to-primary">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{product.title}</h2>
                <div className="flex flex-wrap gap-2 justify-center">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-white/20 text-white border-white/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Fixed close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 bg-white/20 hover:bg-white/40 transition-colors shadow-md z-50"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(85vh - 12rem)'}}>
          <p className="text-gray-700 mb-6 text-lg">
            {product.description}
          </p>
          
          <div className="space-y-8 mt-6">
            {product.details.map((detail, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
                <h3 className="text-xl font-bold text-primary/90 mb-3">{detail.name}</h3>
                <p className="text-gray-600 mb-4 text-base">{detail.description}</p>
                
                {detail.casNumber && (
                  <div className="mb-4 inline-block bg-gray-100 px-3 py-1 rounded-full">
                    <span className="font-semibold text-gray-700">CAS Number: </span>
                    <span className="text-gray-600">{detail.casNumber}</span>
                  </div>
                )}
                
                {detail.applications && detail.applications.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="h-6 w-1 bg-primary/80 mr-2 rounded-full"></span>
                      Applications
                    </h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {detail.applications.map((app, i) => (
                        <li key={i}>{app}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {detail.specifications && Object.keys(detail.specifications).length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="h-6 w-1 bg-primary/80 mr-2 rounded-full"></span>
                      Specifications
                    </h4>
                    <div className="bg-gray-50 rounded-md overflow-hidden border border-gray-100">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                          {Object.entries(detail.specifications).map(([key, value]) => (
                            <tr key={key} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">{key}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}