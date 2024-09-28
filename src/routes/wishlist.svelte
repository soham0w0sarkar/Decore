<script>
    import { supabase } from '$lib/supabaseClient';
    import { onMount } from 'svelte';
 
    let wishlistItems = [];
 
    // Fetch wishlist items from Supabase
    const fetchWishlistItems = async () => {
       const { data, error } = await supabase.from('wishlist').select('*');
       if (error) {
          console.error('Error fetching wishlist items:', error);
       } else {
          wishlistItems = data;
       }
    };
 
    // Use onMount to fetch data once the component is mounted
    onMount(() => {
       fetchWishlistItems();
    });
 </script>
 