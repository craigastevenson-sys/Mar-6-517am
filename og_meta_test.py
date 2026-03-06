#!/usr/bin/env python3
"""
Open Graph Meta Tags Testing Script
Tests the implementation of og:image and twitter:image meta tags for three sites.
"""

import requests
import re
import sys
from bs4 import BeautifulSoup

class OGMetaTagsTester:
    def __init__(self, base_url="https://launch-finalize-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        
    def run_test(self, name, test_func):
        """Run a single test"""
        self.tests_run += 1
        print(f"\n🔍 {name}...")
        
        try:
            success = test_func()
            if success:
                self.tests_passed += 1
                print(f"✅ {name} - PASSED")
            else:
                print(f"❌ {name} - FAILED")
            return success
        except Exception as e:
            print(f"❌ {name} - ERROR: {str(e)}")
            return False
    
    def get_page_content(self):
        """Fetch the HTML content from the site"""
        try:
            response = requests.get(self.base_url, timeout=10)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Error fetching page: {e}")
            return None
    
    def extract_meta_tags(self, html_content):
        """Extract meta tags from HTML content"""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        meta_tags = {}
        
        # Extract Open Graph tags
        og_image = soup.find('meta', attrs={'property': 'og:image'})
        if og_image:
            meta_tags['og:image'] = og_image.get('content', '')
            
        og_image_width = soup.find('meta', attrs={'property': 'og:image:width'})
        if og_image_width:
            meta_tags['og:image:width'] = og_image_width.get('content', '')
            
        og_image_height = soup.find('meta', attrs={'property': 'og:image:height'})
        if og_image_height:
            meta_tags['og:image:height'] = og_image_height.get('content', '')
            
        og_image_alt = soup.find('meta', attrs={'property': 'og:image:alt'})
        if og_image_alt:
            meta_tags['og:image:alt'] = og_image_alt.get('content', '')
            
        # Extract Twitter tags
        twitter_image = soup.find('meta', attrs={'name': 'twitter:image'})
        if twitter_image:
            meta_tags['twitter:image'] = twitter_image.get('content', '')
            
        twitter_card = soup.find('meta', attrs={'name': 'twitter:card'})
        if twitter_card:
            meta_tags['twitter:card'] = twitter_card.get('content', '')
            
        return meta_tags
    
    def test_meta_tags_presence(self):
        """Test 1: Verify all required meta tags are present"""
        html_content = self.get_page_content()
        if not html_content:
            return False
            
        meta_tags = self.extract_meta_tags(html_content)
        
        required_tags = [
            'og:image',
            'og:image:width', 
            'og:image:height',
            'og:image:alt',
            'twitter:image'
        ]
        
        print("Meta tags found:")
        for tag in required_tags:
            value = meta_tags.get(tag, 'NOT FOUND')
            print(f"  {tag}: {value}")
            
        missing_tags = [tag for tag in required_tags if tag not in meta_tags or not meta_tags[tag]]
        
        if missing_tags:
            print(f"Missing required tags: {missing_tags}")
            return False
            
        return True
    
    def test_default_image_urls(self):
        """Test 2: Verify default image URLs are correct for advancelanguage.com"""
        html_content = self.get_page_content()
        if not html_content:
            return False
            
        meta_tags = self.extract_meta_tags(html_content)
        
        expected_default_image = "https://images.unsplash.com/photo-1565688527174-775059ac429c?w=1200&h=630&fit=crop"
        
        og_image = meta_tags.get('og:image', '')
        twitter_image = meta_tags.get('twitter:image', '')
        
        print(f"Expected image: {expected_default_image}")
        print(f"Found og:image: {og_image}")
        print(f"Found twitter:image: {twitter_image}")
        
        if og_image == expected_default_image and twitter_image == expected_default_image:
            print("✓ Default images match expected URLs")
            return True
        else:
            print("✗ Default images don't match expected URLs")
            return False
    
    def test_image_dimensions(self):
        """Test 3: Verify image dimensions are correct"""
        html_content = self.get_page_content()
        if not html_content:
            return False
            
        meta_tags = self.extract_meta_tags(html_content)
        
        width = meta_tags.get('og:image:width', '')
        height = meta_tags.get('og:image:height', '')
        
        print(f"Image width: {width}")
        print(f"Image height: {height}")
        
        if width == "1200" and height == "630":
            print("✓ Image dimensions are correct (1200x630)")
            return True
        else:
            print("✗ Image dimensions are incorrect")
            return False
    
    def test_dynamic_script_presence(self):
        """Test 4: Verify dynamic switching script is present in HTML"""
        html_content = self.get_page_content()
        if not html_content:
            return False
            
        # Check for the dynamic script elements
        script_indicators = [
            "window.location.hostname.toLowerCase()",
            "giantstepstutors",
            "avance-langue",
            "setMeta",
            "og:image"
        ]
        
        found_indicators = []
        for indicator in script_indicators:
            if indicator in html_content:
                found_indicators.append(indicator)
                print(f"✓ Found: {indicator}")
            else:
                print(f"✗ Missing: {indicator}")
        
        if len(found_indicators) >= 4:  # Most indicators should be present
            print("✓ Dynamic switching script appears to be present")
            return True
        else:
            print("✗ Dynamic switching script may be missing or incomplete")
            return False
    
    def test_tutoring_image_reference(self):
        """Test 5: Verify tutoring image URL is referenced in script"""
        html_content = self.get_page_content()
        if not html_content:
            return False
            
        tutoring_image = "https://images.unsplash.com/photo-1758685733907-42e9651721f5?w=1200&h=630&fit=crop"
        
        if tutoring_image in html_content:
            print(f"✓ Tutoring image URL found: {tutoring_image}")
            return True
        else:
            print(f"✗ Tutoring image URL not found: {tutoring_image}")
            return False
    
    def test_french_image_reference(self):
        """Test 6: Verify French training image URL is referenced in script"""
        html_content = self.get_page_content()
        if not html_content:
            return False
            
        french_image = "https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?w=1200&h=630&fit=crop"
        
        if french_image in html_content:
            print(f"✓ French training image URL found: {french_image}")
            return True
        else:
            print(f"✗ French training image URL not found: {french_image}")
            return False
    
    def test_alt_text_quality(self):
        """Test 7: Verify alt text is descriptive and appropriate"""
        html_content = self.get_page_content()
        if not html_content:
            return False
            
        meta_tags = self.extract_meta_tags(html_content)
        alt_text = meta_tags.get('og:image:alt', '')
        
        print(f"Alt text: '{alt_text}'")
        
        # Check for quality indicators
        quality_indicators = [
            len(alt_text) > 10,  # Not too short
            len(alt_text) < 100,  # Not too long
            any(word in alt_text.lower() for word in ['professional', 'training', 'language']),  # Relevant keywords
            not alt_text.lower().startswith('image'),  # Not generic
        ]
        
        passed_checks = sum(quality_indicators)
        
        if passed_checks >= 3:
            print("✓ Alt text appears to be of good quality")
            return True
        else:
            print("✗ Alt text may need improvement")
            return False

def main():
    """Run all Open Graph meta tags tests"""
    print("🧪 Open Graph Meta Tags Testing Suite")
    print("=" * 50)
    
    tester = OGMetaTagsTester()
    
    # Run all tests
    tests = [
        ("Meta Tags Presence", tester.test_meta_tags_presence),
        ("Default Image URLs", tester.test_default_image_urls),
        ("Image Dimensions", tester.test_image_dimensions),
        ("Dynamic Script Presence", tester.test_dynamic_script_presence),
        ("Tutoring Image Reference", tester.test_tutoring_image_reference),
        ("French Image Reference", tester.test_french_image_reference),
        ("Alt Text Quality", tester.test_alt_text_quality),
    ]
    
    for test_name, test_func in tests:
        tester.run_test(test_name, test_func)
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! Open Graph implementation looks good.")
        return 0
    else:
        print("⚠️  Some tests failed. Please review the implementation.")
        return 1

if __name__ == "__main__":
    sys.exit(main())